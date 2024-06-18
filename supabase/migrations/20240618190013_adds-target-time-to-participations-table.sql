alter table "public"."participations" add column "target_time" bigint;

create policy "Enable update for users based on user_id"
on "public"."participations"
as permissive
for update
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



