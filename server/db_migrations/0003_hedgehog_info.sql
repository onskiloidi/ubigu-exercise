ALTER TABLE hedgehog 
ADD hedgehog_name VARCHAR(255) NOT NULL,
ADD hedgehog_gender VARCHAR(1) DEFAULT 'M',
ADD CHECK (hedgehog_gender = 'M' OR hedgehog_gender = 'F'),
ADD hedgehog_cakeday DATE DEFAULT NULL;