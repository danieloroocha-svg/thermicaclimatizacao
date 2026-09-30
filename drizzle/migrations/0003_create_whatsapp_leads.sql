CREATE TABLE public.whatsapp_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 255),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255),
  company text NOT NULL CHECK (char_length(company) BETWEEN 2 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 8 AND 40),
  page_title text,
  page_url text,
  status text NOT NULL DEFAULT 'novo'
);
GRANT INSERT ON public.whatsapp_leads TO anon, authenticated;
GRANT SELECT, UPDATE ON public.whatsapp_leads TO authenticated;
GRANT ALL ON public.whatsapp_leads TO service_role;
ALTER TABLE public.whatsapp_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit whatsapp leads" ON public.whatsapp_leads FOR INSERT TO anon, authenticated WITH CHECK (status = 'novo');
CREATE POLICY "Admins can view whatsapp leads" ON public.whatsapp_leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update whatsapp leads" ON public.whatsapp_leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));