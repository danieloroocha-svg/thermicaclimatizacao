CREATE POLICY "Anyone can upload contact documents"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'contact-documents'
  AND lower(storage.extension(name)) IN ('pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg')
);

CREATE POLICY "Admins can read contact documents"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'contact-documents' AND public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.claim_thermica_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_email text;
BEGIN
  caller_email := lower(coalesce(auth.jwt() ->> 'email', ''));
  IF caller_email <> 'comercial@thermicaclimatizacao.com.br' THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (auth.uid(), 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_thermica_admin() TO authenticated;