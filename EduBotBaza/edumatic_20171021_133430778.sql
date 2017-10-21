--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.0

-- Started on 2017-10-21 13:34:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2208 (class 1262 OID 83167)
-- Name: edumatic; Type: DATABASE; Schema: -; Owner: lmp
--

CREATE DATABASE edumatic WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Polish_Poland.1250' LC_CTYPE = 'Polish_Poland.1250';


ALTER DATABASE edumatic OWNER TO lmp;

\connect edumatic

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12387)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2211 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 194 (class 1259 OID 83959)
-- Name: distractor; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE distractor (
    id integer NOT NULL,
    type character varying NOT NULL,
    distr_content character varying NOT NULL
);


ALTER TABLE distractor OWNER TO lmp;

--
-- TOC entry 193 (class 1259 OID 83957)
-- Name: distractor_id_seq; Type: SEQUENCE; Schema: public; Owner: lmp
--

CREATE SEQUENCE distractor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE distractor_id_seq OWNER TO lmp;

--
-- TOC entry 2212 (class 0 OID 0)
-- Dependencies: 193
-- Name: distractor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lmp
--

ALTER SEQUENCE distractor_id_seq OWNED BY distractor.id;


--
-- TOC entry 191 (class 1259 OID 83925)
-- Name: edumodule; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE edumodule (
    id integer NOT NULL,
    id_group smallint,
    difficulty character varying NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    example character varying,
    test_type character varying,
    test_task character varying,
    test_answer character varying
);


ALTER TABLE edumodule OWNER TO lmp;

--
-- TOC entry 192 (class 1259 OID 83944)
-- Name: edumodule_gamecontext; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE edumodule_gamecontext (
    edumodule_id integer NOT NULL,
    game_score integer NOT NULL,
    game_content character varying
);


ALTER TABLE edumodule_gamecontext OWNER TO lmp;

--
-- TOC entry 190 (class 1259 OID 83923)
-- Name: edumodule_id_seq; Type: SEQUENCE; Schema: public; Owner: lmp
--

CREATE SEQUENCE edumodule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE edumodule_id_seq OWNER TO lmp;

--
-- TOC entry 2213 (class 0 OID 0)
-- Dependencies: 190
-- Name: edumodule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lmp
--

ALTER SEQUENCE edumodule_id_seq OWNED BY edumodule.id;


--
-- TOC entry 185 (class 1259 OID 83881)
-- Name: enum_diff_level; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE enum_diff_level (
    difficulty character varying NOT NULL
);


ALTER TABLE enum_diff_level OWNER TO lmp;

--
-- TOC entry 186 (class 1259 OID 83889)
-- Name: enum_test_type; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE enum_test_type (
    type character varying NOT NULL
);


ALTER TABLE enum_test_type OWNER TO lmp;

--
-- TOC entry 187 (class 1259 OID 83897)
-- Name: enum_user_role; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE enum_user_role (
    role character varying NOT NULL
);


ALTER TABLE enum_user_role OWNER TO lmp;

--
-- TOC entry 189 (class 1259 OID 83907)
-- Name: user; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE "user" (
    id integer NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'student'::character varying NOT NULL,
    score integer DEFAULT 0
);


ALTER TABLE "user" OWNER TO lmp;

--
-- TOC entry 196 (class 1259 OID 83983)
-- Name: user_distractor; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE user_distractor (
    user_id integer NOT NULL,
    distractor_id integer NOT NULL,
    time_last_used timestamp without time zone NOT NULL
);


ALTER TABLE user_distractor OWNER TO lmp;

--
-- TOC entry 195 (class 1259 OID 83968)
-- Name: user_edumodule; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE user_edumodule (
    user_id integer NOT NULL,
    edumodule_id integer NOT NULL,
    result boolean NOT NULL
);


ALTER TABLE user_edumodule OWNER TO lmp;

--
-- TOC entry 188 (class 1259 OID 83905)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: lmp
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO lmp;

--
-- TOC entry 2214 (class 0 OID 0)
-- Dependencies: 188
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lmp
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- TOC entry 2048 (class 2604 OID 83962)
-- Name: distractor id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY distractor ALTER COLUMN id SET DEFAULT nextval('distractor_id_seq'::regclass);


--
-- TOC entry 2047 (class 2604 OID 83928)
-- Name: edumodule id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule ALTER COLUMN id SET DEFAULT nextval('edumodule_id_seq'::regclass);


--
-- TOC entry 2044 (class 2604 OID 83910)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2201 (class 0 OID 83959)
-- Dependencies: 194
-- Data for Name: distractor; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY distractor (id, type, distr_content) FROM stdin;
\.


--
-- TOC entry 2215 (class 0 OID 0)
-- Dependencies: 193
-- Name: distractor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('distractor_id_seq', 1, false);


--
-- TOC entry 2198 (class 0 OID 83925)
-- Dependencies: 191
-- Data for Name: edumodule; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY edumodule (id, id_group, difficulty, title, content, example, test_type, test_task, test_answer) FROM stdin;
\.


--
-- TOC entry 2199 (class 0 OID 83944)
-- Dependencies: 192
-- Data for Name: edumodule_gamecontext; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY edumodule_gamecontext (edumodule_id, game_score, game_content) FROM stdin;
\.


--
-- TOC entry 2216 (class 0 OID 0)
-- Dependencies: 190
-- Name: edumodule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('edumodule_id_seq', 1, false);


--
-- TOC entry 2192 (class 0 OID 83881)
-- Dependencies: 185
-- Data for Name: enum_diff_level; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY enum_diff_level (difficulty) FROM stdin;
hard
medium
easy
\.


--
-- TOC entry 2193 (class 0 OID 83889)
-- Dependencies: 186
-- Data for Name: enum_test_type; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY enum_test_type (type) FROM stdin;
choice
code
open_question
\.


--
-- TOC entry 2194 (class 0 OID 83897)
-- Dependencies: 187
-- Data for Name: enum_user_role; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY enum_user_role (role) FROM stdin;
admin
teacher
student
\.


--
-- TOC entry 2196 (class 0 OID 83907)
-- Dependencies: 189
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY "user" (id, login, password, role, score) FROM stdin;
1	pysio	grubasek	student	0
\.


--
-- TOC entry 2203 (class 0 OID 83983)
-- Dependencies: 196
-- Data for Name: user_distractor; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_distractor (user_id, distractor_id, time_last_used) FROM stdin;
\.


--
-- TOC entry 2202 (class 0 OID 83968)
-- Dependencies: 195
-- Data for Name: user_edumodule; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_edumodule (user_id, edumodule_id, result) FROM stdin;
\.


--
-- TOC entry 2217 (class 0 OID 0)
-- Dependencies: 188
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('user_id_seq', 1, true);


--
-- TOC entry 2062 (class 2606 OID 83967)
-- Name: distractor distractor_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY distractor
    ADD CONSTRAINT distractor_pkey PRIMARY KEY (id);


--
-- TOC entry 2060 (class 2606 OID 83951)
-- Name: edumodule_gamecontext edumodule_gamecontext_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule_gamecontext
    ADD CONSTRAINT edumodule_gamecontext_pkey PRIMARY KEY (edumodule_id);


--
-- TOC entry 2058 (class 2606 OID 83933)
-- Name: edumodule edumodule_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule
    ADD CONSTRAINT edumodule_pkey PRIMARY KEY (id);


--
-- TOC entry 2050 (class 2606 OID 83888)
-- Name: enum_diff_level enum_diff_level_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY enum_diff_level
    ADD CONSTRAINT enum_diff_level_pkey PRIMARY KEY (difficulty);


--
-- TOC entry 2052 (class 2606 OID 83896)
-- Name: enum_test_type enum_test_type_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY enum_test_type
    ADD CONSTRAINT enum_test_type_pkey PRIMARY KEY (type);


--
-- TOC entry 2054 (class 2606 OID 83904)
-- Name: enum_user_role enum_user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY enum_user_role
    ADD CONSTRAINT enum_user_role_pkey PRIMARY KEY (role);


--
-- TOC entry 2066 (class 2606 OID 83987)
-- Name: user_distractor user_distractor_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_distractor
    ADD CONSTRAINT user_distractor_pkey PRIMARY KEY (user_id, distractor_id);


--
-- TOC entry 2064 (class 2606 OID 83972)
-- Name: user_edumodule user_edumodule_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_edumodule
    ADD CONSTRAINT user_edumodule_pkey PRIMARY KEY (user_id, edumodule_id);


--
-- TOC entry 2056 (class 2606 OID 83917)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2068 (class 2606 OID 83934)
-- Name: edumodule edumodule_difficulty_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule
    ADD CONSTRAINT edumodule_difficulty_fkey FOREIGN KEY (difficulty) REFERENCES enum_diff_level(difficulty);


--
-- TOC entry 2070 (class 2606 OID 83952)
-- Name: edumodule_gamecontext edumodule_gamecontext_edumodule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule_gamecontext
    ADD CONSTRAINT edumodule_gamecontext_edumodule_id_fkey FOREIGN KEY (edumodule_id) REFERENCES edumodule(id);


--
-- TOC entry 2069 (class 2606 OID 83939)
-- Name: edumodule edumodule_test_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule
    ADD CONSTRAINT edumodule_test_type_fkey FOREIGN KEY (test_type) REFERENCES enum_test_type(type);


--
-- TOC entry 2074 (class 2606 OID 83993)
-- Name: user_distractor user_distractor_distractor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_distractor
    ADD CONSTRAINT user_distractor_distractor_id_fkey FOREIGN KEY (distractor_id) REFERENCES distractor(id);


--
-- TOC entry 2073 (class 2606 OID 83988)
-- Name: user_distractor user_distractor_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_distractor
    ADD CONSTRAINT user_distractor_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2072 (class 2606 OID 83978)
-- Name: user_edumodule user_edumodule_edumodule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_edumodule
    ADD CONSTRAINT user_edumodule_edumodule_id_fkey FOREIGN KEY (edumodule_id) REFERENCES edumodule(id);


--
-- TOC entry 2071 (class 2606 OID 83973)
-- Name: user_edumodule user_edumodule_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_edumodule
    ADD CONSTRAINT user_edumodule_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2067 (class 2606 OID 83918)
-- Name: user user_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_role_fkey FOREIGN KEY (role) REFERENCES enum_user_role(role);


--
-- TOC entry 2210 (class 0 OID 0)
-- Dependencies: 3
-- Name: public; Type: ACL; Schema: -; Owner: lmp
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT ALL ON SCHEMA public TO lmp;


-- Completed on 2017-10-21 13:34:32

--
-- PostgreSQL database dump complete
--

