DROP DATABASE dev_journals;
CREATE DATABASE dev_journals;
USE dev_journals;

create table commit
(
    id int not null
        primary key
);

create table user
(
    id        int          not null auto_increment
        primary key,
    login     varchar(30)  not null,
    pass_hash varchar(255) null
);

create table project
(
    id       int  not null auto_increment
        primary key,
    name     text not null,
    owner_id int  null,
    constraint FK9ydhxbq67a3m0ek560r2fq38g
        foreign key (owner_id) references user (id)
);

create table entry
(
    id         int auto_increment
        primary key,
    content    text     not null,
    timestamp  datetime not null,
    project_id int      null,
    user_id    int      null,
    constraint FK5rw2f20dwlyun1yiurec07gnm
        foreign key (project_id) references project (id),
    constraint FKb8w0fw4ccf95p9ct3y2gn4nbq
        foreign key (user_id) references user (id)
);

create table committoentry
(
    entryID  int not null,
    commitID int not null,
    primary key (entryID, commitID),
    constraint FK_30
        foreign key (commitID) references commit (id),
    constraint FK_33
        foreign key (entryID) references entry (id)
);

create index fkIdx_31
    on committoentry (commitID);

create index fkIdx_34
    on committoentry (entryID);



