CREATE TABLE "koalas" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(50) NOT NULL,
    "gender" varchar(1) NOT NULL,
    "age" INTEGER,
    "ready_to_transfer" BOOLEAN DEFAULT FALSE,
    "notes" varchar(500)
);



INSERT INTO "koalas"
    ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES
    ('Scotty', 'M', 4, TRUE, 'Born in Guatemala'),
    ('Bobody', 'F', 19, FALSE, 'Loves tacos'),
    ('Ororo', 'F', 7, FALSE, 'Loves listening to Pantera'),
    ('Mr. Bubbles', 'M', 68, TRUE, 'Once met President Clinton, never shuts up about it'),
    ('Charlie', 'M', 9, TRUE, 'Bit my finger');