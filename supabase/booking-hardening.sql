alter table public.bookings
  add column if not exists payment_status text not null default 'pending',
  add column if not exists razorpay_order_id text,
  add column if not exists razorpay_payment_id text,
  add column if not exists notification_sent_at timestamptz;

alter table public.bookings
  drop constraint if exists bookings_payment_status_check;

alter table public.bookings
  add constraint bookings_payment_status_check
  check (payment_status in ('pending', 'paid', 'failed'));

create unique index if not exists bookings_active_slot_unique
  on public.bookings (date, time)
  where payment_status in ('pending', 'paid');

create or replace function public.claim_booking_notification(p_booking_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.bookings
  set notification_sent_at = now()
  where id = p_booking_id
    and payment_status = 'paid'
    and notification_sent_at is null;

  return found;
end;
$$;

revoke all on function public.claim_booking_notification(uuid) from public;
grant execute on function public.claim_booking_notification(uuid) to service_role;
