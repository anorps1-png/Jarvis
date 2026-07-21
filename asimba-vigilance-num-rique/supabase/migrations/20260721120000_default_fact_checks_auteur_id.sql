-- Set default value for auteur_id to auth.uid() on public.fact_checks
ALTER TABLE public.fact_checks 
  ALTER COLUMN auteur_id SET DEFAULT auth.uid();
