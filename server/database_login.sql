CREATE DATABASE tucanojobs
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE public."candidateUsers"
(
    user_id serial NOT NULL,
    user_name character varying(55) NOT NULL,
    user_password character varying(125) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS public."candidateUsers"
(
    user_id integer NOT NULL DEFAULT nextval('"candidateUsers_user_id_seq"'::regclass),
    user_name character varying(55) COLLATE pg_catalog."default" NOT NULL,
    user_password character varying(125) COLLATE pg_catalog."default" NOT NULL,
    full_name character varying(75) COLLATE pg_catalog."default",
    user_email character varying(55) COLLATE pg_catalog."default",
    phone_number character varying(35) COLLATE pg_catalog."default",
    description character varying(255) COLLATE pg_catalog."default",
    user_location character varying(125) COLLATE pg_catalog."default",
    user_tags character varying(125) COLLATE pg_catalog."default",
    profile_picture character varying(175) COLLATE pg_catalog."default",
    pdf_link character varying(175) COLLATE pg_catalog."default",
    youtube_link character varying(175) COLLATE pg_catalog."default",
    user_institution character varying(125) COLLATE pg_catalog."default",
    user_title character varying(125) COLLATE pg_catalog."default",
    valid_resume boolean NOT NULL,
    resume_date date,
    CONSTRAINT "candidateUsers_pkey" PRIMARY KEY (user_id)
)

CREATE TABLE companyUsers(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50),
    user_password VARCHAR(125)
);