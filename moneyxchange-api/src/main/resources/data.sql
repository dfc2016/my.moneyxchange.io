drop table if exists rate;

create table rate (
  name varchar primary key,
  usd_rate decimal not null
);

insert into rate(name, usd_rate) values ('USD',    1.00);
insert into rate(name, usd_rate) values ('EUR',    0.86);
insert into rate(name, usd_rate) values ('COP', 2914.30);
