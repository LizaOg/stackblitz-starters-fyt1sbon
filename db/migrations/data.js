import { up } from '../maigration.js';

async function createDB() {
  //Включение внешних ключей sqlite3
  await up(`PRAGMA forign_key = ON;`);
  // item таблица
  await up(`
    create table if not exists item(
      id integer primary key autoincrement,
      is_delete boolean,
      name text not null,
      propertis json not null,
      status text not null,
      category_id integer not null,
      location_id integer not null,
      current_location_id integer not null,


      foreign key (location_id) references location (id),
      foreign key (current_location_id) references location (id),
      foreign key (category_id) references category (id)

    );
  `);

  //Category таблца
  await up(`
    create table if not exists category(
      id integer primary key autoincrement,
      name text not null,
      parent_id integer,
      foreign key (parent_id) references category (id)
      on delete set null
    );
  `);

  //Structure
  await up(`
  create table if not exists structure(
    id integer primary key autoincrement,
    name text not null
  );
`);

  //Floor
  await up(`
  create table if not exists floor(
    id integer primary key autoincrement,
    name text not null,
    structure_id integer not null,
    foreign key (structure_id) references structure (id)
    on delete set cascade
  );
`);

  //Room
  await up(`
  create table if not exists room(
    id integer primary key autoincrement,
    name text not null,
    floor_id integer not null,
    foreign key (floor_id) references floor (id)
    on delete cascade
  );
`);

  //Place
  await up(`
  create table if not exists place(
    id integer primary key autoincrement,
    name text not null,
    room_id integer not null,
    foreign key (room_id) references room (id)
    on delete cascade
  );
`);

  //Location
  await up(`
  create table if not exists location(
    id integer primary key autoincrement,
    name text not null
    place_id integer not null,
    foreign key (place_id) references place (id)
    on delete set cascade
  );
`);
}
