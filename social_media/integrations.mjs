// Read-only Google APIs. Credentials and results stay outside the public repository.
export async function googleJSON(url,token,fetcher=fetch) {
 const r=await fetcher(url,{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(30000)});
 if(!r.ok) throw new Error(`Google HTTP ${r.status}`);return r.json();
}
export async function driveImages(folderId,token,fetcher=fetch) {
 if(!/^[\w-]+$/.test(folderId)) throw new Error('Pasta inválida');
 const files=[];let pageToken;
 do {const u=new URL('https://www.googleapis.com/drive/v3/files');u.search=new URLSearchParams({q:`'${folderId}' in parents and trashed = false and mimeType contains 'image/'`,fields:'nextPageToken,files(id,name,mimeType,md5Checksum,size)',pageSize:'100',...(pageToken?{pageToken}:{})});const page=await googleJSON(u,token,fetcher); files.push(...page.files);pageToken=page.nextPageToken;} while(pageToken);
 return files.map(f=>({...f,source:'drive',approved:false}));
}
export async function editorialSheet(spreadsheetId,range,token,fetcher=fetch) {
 if(!/^[\w-]+$/.test(spreadsheetId)) throw new Error('Planilha inválida');
 return googleJSON(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`,token,fetcher);
}
