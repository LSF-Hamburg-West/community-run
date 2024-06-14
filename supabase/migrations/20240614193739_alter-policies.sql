alter table "public"."participations" drop constraint "public_participations_profile_id_fkey";

alter table "public"."events" add column "latitude" double precision;

alter table "public"."events" add column "location_name" text;

alter table "public"."events" add column "longitude" double precision;

alter table "public"."participations" drop column "profile_id";

alter table "public"."participations" add column "user_id" uuid not null;

alter table "public"."participations" add constraint "public_participations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."participations" validate constraint "public_participations_user_id_fkey";

alter table "public"."participations" add constraint "public_participations_profile_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."participations" validate constraint "public_participations_profile_id_fkey";

create policy "Enable delete for users based on user_id"
on "public"."participations"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."participations"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."participations"
as permissive
for select
to public
using (true);



