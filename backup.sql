--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 9.6.10

-- Started on 2018-10-30 02:15:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12387)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2157 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 187 (class 1259 OID 16423)
-- Name: referenz_anmeldung; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.referenz_anmeldung (
    id integer NOT NULL,
    referenz character(255),
    plz character(255),
    europaletten numeric(50,0),
    sendung_gewicht numeric(50,0),
    abholung_bereit date,
    abholung_bereit_in character(255),
    anlieferung_spat_bis date,
    anlieferung_spat_in character(255),
    "verfügbar" boolean
);


ALTER TABLE public.referenz_anmeldung OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 16426)
-- Name: referenz_anmeldung_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.referenz_anmeldung_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.referenz_anmeldung_id_seq OWNER TO postgres;

--
-- TOC entry 2158 (class 0 OID 0)
-- Dependencies: 188
-- Name: referenz_anmeldung_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.referenz_anmeldung_id_seq OWNED BY public.referenz_anmeldung.id;


--
-- TOC entry 185 (class 1259 OID 16410)
-- Name: user_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_info (
    id integer NOT NULL,
    email character(255),
    password character(10000),
    user_name character(255)
);


ALTER TABLE public.user_info OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16413)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 2159 (class 0 OID 0)
-- Dependencies: 186
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.user_info.id;


--
-- TOC entry 189 (class 1259 OID 16448)
-- Name: zeit_buchung_referenz; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zeit_buchung_referenz (
    id integer NOT NULL,
    telephone character(50),
    ref_id numeric(1000,0),
    fahrer character(100),
    fahrzeug character(100),
    email_bestatigung text,
    datum_ausgewahlt character(100)
);


ALTER TABLE public.zeit_buchung_referenz OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 16451)
-- Name: zeit_buchung_referenz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zeit_buchung_referenz_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zeit_buchung_referenz_id_seq OWNER TO postgres;

--
-- TOC entry 2160 (class 0 OID 0)
-- Dependencies: 190
-- Name: zeit_buchung_referenz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zeit_buchung_referenz_id_seq OWNED BY public.zeit_buchung_referenz.id;


--
-- TOC entry 2017 (class 2604 OID 16428)
-- Name: referenz_anmeldung id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.referenz_anmeldung ALTER COLUMN id SET DEFAULT nextval('public.referenz_anmeldung_id_seq'::regclass);


--
-- TOC entry 2016 (class 2604 OID 16415)
-- Name: user_info id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2018 (class 2604 OID 16453)
-- Name: zeit_buchung_referenz id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zeit_buchung_referenz ALTER COLUMN id SET DEFAULT nextval('public.zeit_buchung_referenz_id_seq'::regclass);


--
-- TOC entry 2146 (class 0 OID 16423)
-- Dependencies: 187
-- Data for Name: referenz_anmeldung; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.referenz_anmeldung (id, referenz, plz, europaletten, sendung_gewicht, abholung_bereit, abholung_bereit_in, anlieferung_spat_bis, anlieferung_spat_in, "verfügbar") FROM stdin;
\.


--
-- TOC entry 2161 (class 0 OID 0)
-- Dependencies: 188
-- Name: referenz_anmeldung_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.referenz_anmeldung_id_seq', 43, true);


--
-- TOC entry 2162 (class 0 OID 0)
-- Dependencies: 186
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 40, true);


--
-- TOC entry 2144 (class 0 OID 16410)
-- Dependencies: 185
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_info (id, email, password, user_name) FROM stdin;
40	admin                                                                                                                                                                                                                                                          	24f83f5b22|561af1b9f01a1aac4a36b0db381abf89|6bd8dcfc7a980732ec6056590fb6853dc444f160516cd1e59b1368cab1c0c212                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    	admin                                                                                                                                                                                                                                                          
\.


--
-- TOC entry 2148 (class 0 OID 16448)
-- Dependencies: 189
-- Data for Name: zeit_buchung_referenz; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zeit_buchung_referenz (id, telephone, ref_id, fahrer, fahrzeug, email_bestatigung, datum_ausgewahlt) FROM stdin;
\.


--
-- TOC entry 2163 (class 0 OID 0)
-- Dependencies: 190
-- Name: zeit_buchung_referenz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zeit_buchung_referenz_id_seq', 28, true);


--
-- TOC entry 2020 (class 2606 OID 16422)
-- Name: user_info email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 2024 (class 2606 OID 16447)
-- Name: referenz_anmeldung referenz_anmeldung_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.referenz_anmeldung
    ADD CONSTRAINT referenz_anmeldung_pkey PRIMARY KEY (id);


--
-- TOC entry 2022 (class 2606 OID 16420)
-- Name: user_info user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2026 (class 2606 OID 16474)
-- Name: zeit_buchung_referenz zeit_buchung_referenz_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zeit_buchung_referenz
    ADD CONSTRAINT zeit_buchung_referenz_pkey PRIMARY KEY (id);


-- Completed on 2018-10-30 02:15:21

--
-- PostgreSQL database dump complete
--

