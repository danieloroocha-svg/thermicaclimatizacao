/**
 * THÉRMICA — recepção de leads para Google Sheets e aviso por e-mail.
 *
 * Usar em Extensões > Apps Script da planilha:
 * https://docs.google.com/spreadsheets/d/1WYubJjCMUOg2abTbxSvEVPdlzVaPwt1r8hUCNKAC0mo/edit
 *
 * IMPORTANTE: O Web App publicado para "Qualquer pessoa" fica exposto
 * a solicitações não autenticadas. Esta integração é adequada para teste
 * controlado, NÃO é uma validação criptográfica de origem.
 * Em produção, prefira um proxy autenticado do lado do servidor.
 */
const THERMICA = Object.freeze({
  spreadsheetId: '1WYubJjCMUOg2abTbxSvEVPdlzVaPwt1r8hUCNKAC0mo',
  sheetName: 'Leads',
  notificationTo: 'comercial@thermicaclimatizacao.com.br',
  validChannels: ['Formulário técnico', 'WhatsApp'],
  maxRowsPerInvocation: 1000
});

/** A publicação /exec permite uma checagem de disponibilidade sem expor leads. */
function doGet() {
  return ContentService.createTextOutput('THÉRMICA — receptor de leads ativo.');
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'Solicitação vazia' });
    }
    // O navegador envia text/plain, evitando pré-verificação CORS.
    const data = JSON.parse(e.postData.contents);
    return json_(registrarLead_(data));
  } catch (error) {
    console.error('Falha ao receber lead', error);
    return json_({ ok: false, error: 'Falha ao processar solicitação' });
  }
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function clean_(value, max) {
  return (typeof value === 'string' ? value : '').trim().slice(0, max || 255);
}

/** Previne execução de fórmulas ao inserir conteúdo externo na planilha. */
function sheetText_(value) {
  const text = String(value || '');
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function validar_(lead) {
  if (!lead || typeof lead !== 'object' || Array.isArray(lead)) {
    throw new Error('Estrutura inválida');
  }
  const id = clean_(lead.id, 64);
  const channel = clean_(lead.channel, 50);
  const name = clean_(lead.name, 100);
  const company = clean_(lead.company, 150);
  const phone = clean_(lead.phone, 40);
  const email = clean_(lead.email, 255);

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    throw new Error('ID do lead inválido');
  }
  if (THERMICA.validChannels.indexOf(channel) < 0 ||
      name.length < 2 || company.length < 2 || phone.length < 8 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Campos obrigatórios inválidos');
  }
  // Origem é apenas uma informação auxiliar: não constitui autenticação.
  const pageUrl = clean_(lead.pageUrl, 1000);
  if (pageUrl && !/^https:\/\/((www\.)?thermicaclimatizacao\.com\.br)(\/|$|\?)/i.test(pageUrl)) {
    throw new Error('Página de origem inválida');
  }
  return {
    id, channel, name, company, phone, email,
    city: clean_(lead.city, 120),
    demandType: clean_(lead.demandType, 100),
    projectStatus: clean_(lead.projectStatus, 100),
    manufacturer: clean_(lead.manufacturer, 100),
    message: clean_(lead.message, 3000),
    pageTitle: clean_(lead.pageTitle, 255),
    pageUrl,
    attachment: lead.attachment ? 'Sim (no armazenamento privado)' : 'Não'
  };
}

function registrarLead_(raw) {
  const lead = validar_(raw);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.openById(THERMICA.spreadsheetId)
      .getSheetByName(THERMICA.sheetName);
    if (!sheet) throw new Error('Aba Leads não encontrada');
    const last = sheet.getLastRow();
    if (last > 1) {
      const existing = sheet.getRange(2, 2, last - 1, 1)
        .createTextFinder(lead.id).matchEntireCell(true).findNext();
      if (existing) return { ok: true, duplicate: true };
    }

    sheet.appendRow([
      new Date(), sheetText_(lead.id), sheetText_(lead.channel),
      sheetText_(lead.name), sheetText_(lead.company),
      sheetText_(lead.phone), sheetText_(lead.email),
      sheetText_(lead.city), sheetText_(lead.demandType),
      sheetText_(lead.projectStatus), sheetText_(lead.manufacturer),
      sheetText_(lead.message), sheetText_(lead.pageTitle),
      sheetText_(lead.pageUrl), sheetText_(lead.attachment),
      'Novo', '', '', 'Pendente'
    ]);
    const row = sheet.getLastRow();
    SpreadsheetApp.flush();
    try {
      enviarEmail_(lead);
      sheet.getRange(row, 19).setValue('Enviado');
      return { ok: true, row: row, email: true };
    } catch (mailError) {
      sheet.getRange(row, 19).setValue('Falha — verificar envio');
      console.error('Lead salvo; e-mail não enviado', mailError);
      return { ok: true, row: row, email: false };
    }
  } finally {
    lock.releaseLock();
  }
}

function enviarEmail_(lead) {
  const fields = [
    ['Canal', lead.channel],
    ['Nome', lead.name],
    ['Empresa', lead.company],
    ['Telefone', lead.phone],
    ['E-mail', lead.email],
    ['Cidade / UF', lead.city],
    ['Demanda', lead.demandType],
    ['Situação do projeto', lead.projectStatus],
    ['Fabricante', lead.manufacturer],
    ['Mensagem', lead.message],
    ['Página de origem', lead.pageTitle],
    ['URL de origem', lead.pageUrl],
    ['Anexo no Supabase', lead.attachment],
    ['Identificador', lead.id]
  ].filter(function(item) { return Boolean(item[1]); });

  const body = [
    'Novo lead recebido pelo site THÉRMICA',
    '',
    ...fields.map(function(item) { return item[0] + ': ' + item[1]; }),
    '',
    'Acompanhe a planilha:',
    'https://docs.google.com/spreadsheets/d/' + THERMICA.spreadsheetId + '/edit',
    '',
    'Este aviso foi gerado automaticamente.'
  ].join('\n');

  MailApp.sendEmail({
    to: THERMICA.notificationTo,
    subject: '[THÉRMICA] Novo lead — ' + lead.channel,
    body: body,
    name: 'THÉRMICA | Captação de Leads'
  });
}

/**
 * Executar UMA VEZ no editor para autorizar e testar
 * a gravação e o disparo de e-mail, antes de publicar o Web App.
 * Cria uma linha claramente marcada como TESTE (pode ser excluída depois).
 */
function testarIntegracao() {
  const output = registrarLead_({
    id: Utilities.getUuid(),
    channel: 'Formulário técnico',
    name: 'Teste automático THÉRMICA',
    company: 'Teste de integração',
    phone: '11999999999',
    email: 'teste@example.com',
    city: 'São Paulo/SP',
    demandType: 'Nova instalação',
    projectStatus: 'Preciso de uma avaliação técnica',
    manufacturer: '',
    message: 'TESTE — validar gravação no Sheets e recebimento de e-mail.',
    pageTitle: 'TESTE de integração',
    pageUrl: 'https://thermicaclimatizacao.com.br/contato',
    attachment: false
  });
  console.log('Resultado do teste: ' + JSON.stringify(output));
  if (!output.ok || !output.email) {
    throw new Error('Teste inconclusivo: conferir planilha e e-mail comercial.');
  }
}

/**
 * Recupera notificações pendentes sem criar registros duplicados.
 * Pode ser agendado pelo Apps Script, com execução a cada 15 minutos.
 */
function reprocessarEmailsPendentes() {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.openById(THERMICA.spreadsheetId)
      .getSheetByName(THERMICA.sheetName);
    const last = sheet.getLastRow();
    if (last < 2) return;
    const rows = sheet.getRange(2, 1, last - 1, 19).getValues();
    let processed = 0;
    for (let i = 0; i < rows.length && processed < 15; i++) {
      const row = rows[i];
      const state = String(row[18] || '');
      if (state !== 'Pendente' && state.indexOf('Falha') !== 0) continue;
      const lead = {
        id: String(row[1] || ''),
        channel: String(row[2] || ''),
        name: String(row[3] || ''),
        company: String(row[4] || ''),
        phone: String(row[5] || ''),
        email: String(row[6] || ''),
        city: String(row[7] || ''),
        demandType: String(row[8] || ''),
        projectStatus: String(row[9] || ''),
        manufacturer: String(row[10] || ''),
        message: String(row[11] || ''),
        pageTitle: String(row[12] || ''),
        pageUrl: String(row[13] || ''),
        attachment: String(row[14] || ''),
      };
      try {
        enviarEmail_(lead);
        sheet.getRange(i + 2, 19).setValue('Enviado');
      } catch (err) {
        sheet.getRange(i + 2, 19).setValue('Falha — verificar envio');
        console.error('Não foi possível reenviar notificação', err);
      }
      processed++;
    }
  } finally {
    lock.releaseLock();
  }
}

/** Executar UMA VEZ para criar recuperação automática a cada 15 minutos. */
function instalarRecuperacao() {
  const existing = ScriptApp.getProjectTriggers().some(function(trigger) {
    return trigger.getHandlerFunction() === 'reprocessarEmailsPendentes';
  });
  if (!existing) {
    ScriptApp.newTrigger('reprocessarEmailsPendentes')
      .timeBased().everyMinutes(15).create();
  }
}
