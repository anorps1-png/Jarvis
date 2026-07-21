-- Allow public and authenticated insertion into signalements
ALTER TABLE public.signalements ALTER COLUMN auteur_id SET DEFAULT auth.uid();

DROP POLICY IF EXISTS "signalements_insert_policy" ON public.signalements;
DROP POLICY IF EXISTS "signalements_insert_own" ON public.signalements;
DROP POLICY IF EXISTS "signalements_insert_anon" ON public.signalements;
DROP POLICY IF EXISTS "signalements_insert_authenticated" ON public.signalements;
DROP POLICY IF EXISTS "signalements_insert_all" ON public.signalements;

CREATE POLICY "signalements_insert_all" ON public.signalements
  FOR INSERT
  WITH CHECK (true);

-- Allow public and authenticated insertion into alertes
DROP POLICY IF EXISTS "alertes_insert_policy" ON public.alertes;
DROP POLICY IF EXISTS "alertes_insert_own" ON public.alertes;
DROP POLICY IF EXISTS "alertes_insert_authenticated" ON public.alertes;
DROP POLICY IF EXISTS "alertes_insert_all" ON public.alertes;

CREATE POLICY "alertes_insert_all" ON public.alertes
  FOR INSERT
  WITH CHECK (true);

