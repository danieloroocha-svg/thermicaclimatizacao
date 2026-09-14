CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE TABLE public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  company text NOT NULL CHECK (char_length(company) BETWEEN 2 AND 150),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 8 AND 30),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255),
  city text NOT NULL CHECK (char_length(city) BETWEEN 2 AND 120),
  demand_type text NOT NULL CHECK (demand_type IN ('Nova instalação', 'Retrofit', 'Ampliação', 'Substituição', 'Modernização', 'Ainda não sei')),
  project_status text NOT NULL CHECK (project_status IN ('Tenho projeto', 'Projeto em desenvolvimento', 'Não tenho projeto', 'Preciso de uma avaliação técnica')),
  manufacturer text CHECK (manufacturer IS NULL OR char_length(manufacturer) <= 100),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 3000),
  attachment_path text CHECK (attachment_path IS NULL OR char_length(attachment_path) <= 500),
  status text NOT NULL DEFAULT 'novo' CHECK (status IN ('novo', 'em_contato', 'proposta', 'concluido', 'arquivado'))
);
GRANT INSERT ON public.contact_requests TO anon, authenticated;
GRANT SELECT, UPDATE ON public.contact_requests TO authenticated;
GRANT ALL ON public.contact_requests TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact requests"
ON public.contact_requests FOR INSERT TO anon, authenticated
WITH CHECK (status = 'novo');

CREATE POLICY "Admins can view contact requests"
ON public.contact_requests FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact requests"
ON public.contact_requests FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX contact_requests_created_at_idx ON public.contact_requests (created_at DESC);
CREATE INDEX contact_requests_status_idx ON public.contact_requests (status);