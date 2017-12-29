--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.0

-- Started on 2017-12-29 20:26:04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2259 (class 1262 OID 83167)
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
-- TOC entry 2262 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 193 (class 1259 OID 83959)
-- Name: distractor; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE distractor (
    id integer NOT NULL,
    type character varying NOT NULL,
    distr_content character varying NOT NULL
);


ALTER TABLE distractor OWNER TO lmp;

--
-- TOC entry 192 (class 1259 OID 83957)
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
-- TOC entry 2263 (class 0 OID 0)
-- Dependencies: 192
-- Name: distractor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lmp
--

ALTER SEQUENCE distractor_id_seq OWNED BY distractor.id;


--
-- TOC entry 190 (class 1259 OID 83925)
-- Name: edumodule; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE edumodule (
    id integer NOT NULL,
    group_id integer,
    difficulty character varying NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    example character varying,
    group_position integer DEFAULT 2000000000 NOT NULL
);


ALTER TABLE edumodule OWNER TO lmp;

--
-- TOC entry 191 (class 1259 OID 83944)
-- Name: edumodule_gamecontext; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE edumodule_gamecontext (
    edumodule_id integer NOT NULL,
    game_score integer NOT NULL,
    game_content character varying
);


ALTER TABLE edumodule_gamecontext OWNER TO lmp;

--
-- TOC entry 189 (class 1259 OID 83923)
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
-- TOC entry 2264 (class 0 OID 0)
-- Dependencies: 189
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
-- TOC entry 202 (class 1259 OID 102772)
-- Name: enum_distr_type; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE enum_distr_type (
    type character varying NOT NULL
);


ALTER TABLE enum_distr_type OWNER TO lmp;

--
-- TOC entry 186 (class 1259 OID 83897)
-- Name: enum_user_role; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE enum_user_role (
    role character varying NOT NULL
);


ALTER TABLE enum_user_role OWNER TO lmp;

--
-- TOC entry 199 (class 1259 OID 94585)
-- Name: test_code; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE test_code (
    id integer NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    module_id integer NOT NULL,
    task_answer character varying NOT NULL
);


ALTER TABLE test_code OWNER TO lmp;

--
-- TOC entry 198 (class 1259 OID 94583)
-- Name: test_code_id_seq; Type: SEQUENCE; Schema: public; Owner: lmp
--

CREATE SEQUENCE test_code_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE test_code_id_seq OWNER TO lmp;

--
-- TOC entry 2265 (class 0 OID 0)
-- Dependencies: 198
-- Name: test_code_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lmp
--

ALTER SEQUENCE test_code_id_seq OWNED BY test_code.id;


--
-- TOC entry 197 (class 1259 OID 94568)
-- Name: test_question; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE test_question (
    id integer NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    module_id integer NOT NULL,
    question_answer character varying NOT NULL
);


ALTER TABLE test_question OWNER TO lmp;

--
-- TOC entry 196 (class 1259 OID 94566)
-- Name: test_question_id_seq; Type: SEQUENCE; Schema: public; Owner: lmp
--

CREATE SEQUENCE test_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE test_question_id_seq OWNER TO lmp;

--
-- TOC entry 2266 (class 0 OID 0)
-- Dependencies: 196
-- Name: test_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lmp
--

ALTER SEQUENCE test_question_id_seq OWNED BY test_question.id;


--
-- TOC entry 188 (class 1259 OID 83907)
-- Name: user; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE "user" (
    id integer NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'student'::character varying NOT NULL,
    score integer DEFAULT 0,
    last_module integer
);


ALTER TABLE "user" OWNER TO lmp;

--
-- TOC entry 201 (class 1259 OID 94616)
-- Name: user_code; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE user_code (
    user_id integer NOT NULL,
    code_id integer NOT NULL,
    first_result boolean DEFAULT false NOT NULL,
    result boolean DEFAULT false NOT NULL
);


ALTER TABLE user_code OWNER TO lmp;

--
-- TOC entry 195 (class 1259 OID 83983)
-- Name: user_distractor; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE user_distractor (
    user_id integer NOT NULL,
    distractor_id integer NOT NULL,
    time_last_used timestamp without time zone NOT NULL
);


ALTER TABLE user_distractor OWNER TO lmp;

--
-- TOC entry 194 (class 1259 OID 83968)
-- Name: user_edumodule; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE user_edumodule (
    user_id integer NOT NULL,
    edumodule_id integer NOT NULL
);


ALTER TABLE user_edumodule OWNER TO lmp;

--
-- TOC entry 187 (class 1259 OID 83905)
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
-- TOC entry 2267 (class 0 OID 0)
-- Dependencies: 187
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lmp
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- TOC entry 200 (class 1259 OID 94600)
-- Name: user_question; Type: TABLE; Schema: public; Owner: lmp
--

CREATE TABLE user_question (
    user_id integer NOT NULL,
    question_id integer NOT NULL,
    first_result boolean DEFAULT false NOT NULL,
    last_result boolean DEFAULT false NOT NULL,
    last_answer integer DEFAULT '-1'::integer NOT NULL
);


ALTER TABLE user_question OWNER TO lmp;

--
-- TOC entry 2071 (class 2604 OID 83962)
-- Name: distractor id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY distractor ALTER COLUMN id SET DEFAULT nextval('distractor_id_seq'::regclass);


--
-- TOC entry 2069 (class 2604 OID 83928)
-- Name: edumodule id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule ALTER COLUMN id SET DEFAULT nextval('edumodule_id_seq'::regclass);


--
-- TOC entry 2074 (class 2604 OID 94588)
-- Name: test_code id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_code ALTER COLUMN id SET DEFAULT nextval('test_code_id_seq'::regclass);


--
-- TOC entry 2072 (class 2604 OID 94571)
-- Name: test_question id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_question ALTER COLUMN id SET DEFAULT nextval('test_question_id_seq'::regclass);


--
-- TOC entry 2066 (class 2604 OID 83910)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2245 (class 0 OID 83959)
-- Dependencies: 193
-- Data for Name: distractor; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY distractor (id, type, distr_content) FROM stdin;
1	kick	tekscik_bozonarodzeniowy.html
2	reward	hallo_za_wzgorzem.html 
\.


--
-- TOC entry 2268 (class 0 OID 0)
-- Dependencies: 192
-- Name: distractor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('distractor_id_seq', 2, true);


--
-- TOC entry 2242 (class 0 OID 83925)
-- Dependencies: 190
-- Data for Name: edumodule; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY edumodule (id, group_id, difficulty, title, content, example, group_position) FROM stdin;
8	28	easy	Monika Gurdyć - nowy kucyk	Rodzyn kolczaty.\nPychatka-piernik-sernik.\nPróbny tekst\nBońbelek.\nKrówka.	Wielka rogata biedrona.\nMały łoś.	17
10	28	easy	Ale przecież obręcz.	Tekst próbny. Ale to nie znaczy że mniej wazny, raczej bardziej.\nNo a poza tym to kto by się spodziewał hiszpańskiej inkwizycji w polu tekstowym pracy dyplomowej. Hm. Nikt?\n\nBorowiki dorodne maczane w koźlakach przypiekane kurkami.	No i, oczywiście, przykład z kodu:\nfor (var nic in cośtamcośtam)\n    wykonaj_czynności();\n    zawiadom_mame_ze_zrobione();\nreturn kasa_na_lody;\n\nRurka z kremem.	18
12	20	easy	Zdzisław miękka rura	Nowy tekst na próbę.	Konio, krówka miąć.	12
44	\N	hard	Lista numerków małych	Przykład\nRozkład\nNakład\nPodkład\nWykład\nWkład\nZakład\n\n\nTekst na niedzielę, szybki, krótki, dogłębny i pouczający.\n\nW lewo\n\nPod górkę i schodami w dół	if (nic) then\n    coś;\n    potem jeszcze;\nendif\n\nZnów bez przykładu.\nA może by jednak?\nOk, niech będzie.\n\n"Przykład"\n\nOk?\n\npotem w prawo\n\n18 baryłek rumu\n3 kopy jaj\n9 beczek dziegciu zagęszczanego piwem\n13 noży do sztaksli\n5 haków z zacięciem	0
35	\N	hard	Mięso wędzone zazębiane kłębem	Kurczaki górą. Dwie piędzie dębiny i baran.\n\nTekst próbny. Ale to nie znaczy że mniej wazny!\nNo a poza tym to kto by się spodziewał hiszpańskiej inkwizycji w polu tekstowym pracy dyplomowej. Hm. Nikt?\n\nA tu - niespodzianka!\nBo tu bedzie WIEDZA przez duże DZ.\nAle jeszcze nie teraz.\nPóżniej.\n\nPróbny tekst\nBońbelek.\nKrówka.\n\nTekst próbny. Ale to nie znaczy że mniej wazny!\nNo a poza tym to kto by się spodziewał hiszpańskiej inkwizycji w polu tekstowym pracy dyplomowej. Hm. Nikt?\n\nNowy tekst na próbę.\n\nWodorost skłebiony, faluje płynnie w toni błękitu łuską rybią śluzionego.\n\nKurczaki górą. Dwie piędzie dębiny i baran.\n\nTekst próbny. Ale to nie znaczy że mniej wazny!\nNo a poza tym to kto by się spodziewał hiszpańskiej inkwizycji w polu tekstowym pracy dyplomowej. Hm. Nikt?\n\nA tu - niespodzianka!\nBo tu bedzie WIEDZA przez duże DZ.\nAle jeszcze nie teraz.\nPóżniej.	Stuka, puka , kręci, wierci. A to tylko programista na wiosnę.\n\nNo i, oczywiście, przykład z kodu:\nfor (var nic in cośtamcośtam)\n    wykonaj_czynności();\n    zawiadom_mame_ze_zrobione();\nreturn kasa_na_lody;\n\nProszę pana, ale jak tu ja, student, umieścić mam coś. Przecież nie umiem.\nTo niemożliwe jest wymagać od nieumiejącego.\nDlatego wnioskuję o nie wymaganie i miłościwość.\nBo jak nie to pójdę się poskarżyć i będzie ŹLE.\n\nMały łoś.\n\nNo i, oczywiście, przykład z kodu:\nfor (var nic in cośtamcośtam)\n    wykonaj_czynności();\n    zawiadom_mame_ze_zrobione();\nreturn kasa_na_lody;\n\nKonio, krówka miąć.\n\nKurka, kurka, gęś.\nKaczorek.\nTraszka pospolita w koninkcji z wielbładzim przyrybkiem chropatym.\n\n\nStuka, puka , kręci, wierci. A to tylko programista na wiosnę.\n\nNo i, oczywiście, przykład z kodu:\nfor (var nic in cośtamcośtam)\n    wykonaj_czynności();\n    zawiadom_mame_ze_zrobione();\nreturn kasa_na_lody;\n\nProszę pana, ale jak tu ja, student, umieścić mam coś. Przecież nie umiem.\nTo niemożliwe jest wymagać od nieumiejącego.\nDlatego wnioskuję o nie wymaganie i miłościwość.\nBo jak nie to pójdę się poskarżyć i będzie ŹLE.	8
42	65	easy	Numerek 15		\N	25
1	48	easy	Tytułem wstępu	       ===>    WITAMY, WITAMY!  --  WELCOME GORĄCO!   <===\n\nKaczka.\nKoń.\nKrowa.\nKoń włochaty, kopyta prawe.\n\nMateriał z JavaScript. Świeży. Od szczęśliwych prosiaków i  gęsi. Z trawą, która trochę tylko mułem trąci, ale to jest przecież do przyjęcia?\n\nMyrmykologia dla zaawansowanych.\n\n\n\n       ===>    A WIĘC! (bez zbędnej zwłoki) -- DO BOJU!   <===	                              ===>  POTRZEBNE RZECZY:   <===\n\nJaja.\nMleko.\nRóg.\nSzczecina.\nTrzonowce w zalewie ogórkowo-octowej.\n\nNo i oczywiście bimber pierwszej jakości, zawartość alkoholu etylowego niska, tylko 8%.witaWITA	2
20	35	medium	Konik - pychacz	Kurczaki górą. Dwie piędzie dębiny i baran.\n\nTekst próbny. Ale to nie znaczy że mniej wazny!\nNo a poza tym to kto by się spodziewał hiszpańskiej inkwizycji w polu tekstowym pracy dyplomowej. Hm. Nikt?\n\nA tu - niespodzianka!\nBo tu bedzie WIEDZA przez duże DZ.\nAle jeszcze nie teraz.\nPóżniej.	Stuka, puka , kręci, wierci. A to tylko programista na wiosnę.\n\nNo i, oczywiście, przykład z kodu:\nfor (var nic in cośtamcośtam)\n    wykonaj_czynności();\n    zawiadom_mame_ze_zrobione();\nreturn kasa_na_lody;\n\nProszę pana, ale jak tu ja, student, umieścić mam coś. Przecież nie umiem.\nTo niemożliwe jest wymagać od nieumiejącego.\nDlatego wnioskuję o nie wymaganie i miłościwość.\nBo jak nie to pójdę się poskarżyć i będzie ŹLE.	9
43	44	medium	Droga	W lewo\n\nPod górkę i schodami w dół	potem w prawo\n\n18 baryłek rumu\n3 kopy jaj\n9 beczek dziegciu zagęszczanego piwem\n13 noży do sztaksli\n5 haków z zacięciem	5
28	35	medium	Kurczaczki poddłuszczane	Próbny tekst\nBońbelek.\nKrówka.\n\nTekst próbny. Ale to nie znaczy że mniej wazny!\nNo a poza tym to kto by się spodziewał hiszpańskiej inkwizycji w polu tekstowym pracy dyplomowej. Hm. Nikt?\n\nNowy tekst na próbę.	Mały łoś.\n\nNo i, oczywiście, przykład z kodu:\nfor (var nic in cośtamcośtam)\n    wykonaj_czynności();\n    zawiadom_mame_ze_zrobione();\nreturn kasa_na_lody;\n\nKonio, krówka miąć.	16
11	20	easy	Stadnina Wielogóra	A tu - niespodzianka!\nBo tu bedzie WIEDZA przez duże DZ.\nAle jeszcze nie teraz.\nPóżniej.	Proszę pana, ale jak tu ja, student, umieścić mam coś. Przecież nie umiem.\nTo niemożliwe jest wymagać od nieumiejącego.\nDlatego wnioskuję o nie wymaganie i miłościwość.\nBo jak nie to pójdę się poskarżyć i będzie ŹLE.	10
13	29	easy	Pyszczek ryby głębinowej	Podgrzebki wypełzaja skośnie.\nWodorost włochaty, skłebiony mętnie, faluje płynnie w toni błękitu łuską rybią śluzionego.	Olbrzymi, rozkrzaczony zachłannie dąb-krowiacz.\nSzypułka zapasiasta, kręta.\nKurka, kurka, gęś.\nKaczorek.\nTraszka pospolita w koninkcji z wielbładzim przyrybkiem chropatym.\n	15
29	35	medium	Mrówka-holenderka łaciata	Pręgowany wodorost skłebiony, faluje płynnie w toni błękitu łuską rybią śluzionego.\n\nKurczaki górą. Dwie piędzie dębiny i baran.\n\nTekst próbny. Ale to nie znaczy że mniej wazny!\nNo a poza tym to kto by się spodziewał hiszpańskiej inkwizycji w polu tekstowym pracy dyplomowej. Hm. Nikt?\n\nA tu - niespodzianka!\nBo tu bedzie WIEDZA przez duże DZ.\nAle jeszcze nie teraz.\nPóżniej.	Bocian biały, donosiciel. Kurka, kurka, gęś.\nKaczorek.\nTraszka pospolita w koninkcji z wielbładzim przyrybkiem chropatym.\n\n\nStuka, puka , kręci, wierci. A to tylko programista na wiosnę.\n\nNo i, oczywiście, przykład z kodu:\nfor (var nic in cośtamcośtam)\n    wykonaj_czynności();\n    zawiadom_mame_ze_zrobione();\nreturn kasa_na_lody;\n\nProszę pana, ale jak tu ja, student, umieścić mam coś. Przecież nie umiem.\nTo niemożliwe jest wymagać od nieumiejącego.\nDlatego wnioskuję o nie wymaganie i miłościwość.\nBo jak nie to pójdę się poskarżyć i będzie ŹLE.	13
70	\N	hard	Zatoki przymroki	\n\n13 twardych kasztanów zmieszanych z kozim mlekiem wymieszać dokładnie.\nDolać 2 kwarty octu korzennego, utrzeć 2 jaja i posypać masłem.\nMleć 3 pacierze, zmienić kierunek i udać się do Wielobrzeża Górnego.\n\nBucio piekarz.\n3 kubełki zimnego oślzgłego.\n2 rękawiczki lewe, przetarte, olejowane.\n\nW swięta lubimy makowiec.\n\nBordo miauczał zaciekle. Wsiudując poniekąd skrętne kaczuszki płynął wytrwale omijając boje. Fala zalewała mu wąsy, a wściekłe meduzy szarpały go za grzbiet i wnętrzności. \nAle Bordo bywał już w gorszych tarapatach. Na przykład, gdy ukradł dźwigowemu kiełbasę. Tam, faktycznie, było blisko, gdy dźwigowy, nie znajdując już innego sposobu cisnął w niego najpierw 20-tonowym żurawiem, a potem całą podstawą czołgodźwigu portowego, usiłując wydobyć z pyska Bordo resztkę skórki, która ugrzęzła mu między zębami.\n\nKoń	\n\nTam pobrać 13 złotych tokenów Waligóry i wbić 2 jaja do rosołu.\n\nwhile\n    then\n        if albo i nie if\n        else albo belse\nend\n\nOraz lubimy karpia.\nAlbo i nie lubimy, bo on przecież ginie.\nNo, nie wiem.\n\nSiup\nHip\nNóżka\n\nRyba	19
37	43	easy	Numer 1	W lewo i gniot. Potem głębienie, nieco dotrzaskiwania i struchla. Biała, nienamaczana.	potem w prawo, albo w prawo i w prawo, ewentualnie w prawo zaraz potem jak w prawo było	6
38	43	easy	Numer 2	Pod górkę i schodami w dół	18 baryłek rumu\n3 kopy jaj\n9 beczek dziegciu zagęszczanego piwem\n13 noży do sztaksli\n5 haków z zacięciem	7
39	48	easy	Morze, żywioł chłodny	Przykład\nRozkład\nNakład\nPodkład\nWykład\nWkład\nZakład\n	if (nic) then\n    coś;\n    potem jeszcze;\nendif	4
47	48	easy	Góry, żywioł zdziczały	Stada kozic rogatych zaatakowały wioski. Pożary zasnuły niebo dymem, kozice, zbryzgane krwią, z szaleństwem w oczach ściagają przerażone kury po autostradach, lotniskach i suchych dokach. Bydło rogate zabarykadowało się w ratuszu i ryknęło, że żywcem ich nie wezmą.	Tymczasem ukradkiem pod jamy kozicze zakradł się oddział uderzeniowy szkolonych chomików. W kevlarowych nagoolennikach zsynchornizowały time-chipy. Dowódca w milczeniu zwinął ogon w pięść wskazując nim kierunki ataku 3 podgrupom. Żołnieże obnażyli opancerzone zęby i ruszyli	3
48	44	medium	Życie w żywiołach ponurych	Przykład\nRozkład\nNakład\nPodkład\nWykład\nWkład\nZakład\n\n\nStada kozic rogatych zaatakowały wioski. Pożary zasnuły niebo dymem, kozice, zbryzgane krwią, z szaleństwem w oczach ścigają przerażone kury po autostradach, lotniskach i suchych dokach. Bydło rogate zabarykadowało się w ratuszu i ryknęło, że żywcem ich nie wezmą. Bydło  nierogate zagrzebało się w ściółce, płasko, znikając. Kilka zdesperowanych osobników ze szczeciną rzadką wtargnęło do ministerstwa, gdzie natychmiast wtopiły się w tłum.	if (nic) then\n    coś;\n    potem jeszcze;\nendif\n\nTymczasem ukradkiem pod jamy kozicze zakradł się oddział uderzeniowy szkolonych chomików. W kevlarowych nagolennikach zsynchornizowały time-chipy. Dowódca w milczeniu zwinął ogon w pięść wskazując nim kierunki ataku 3 podgrupom. Żołnierze obnażyli opancerzone zęby i ruszyli	1
65	70	medium	Błędne mroki cyfrowej zatoki grud	\n\n13 twardych kasztanów zmieszanych z kozim mlekiem wymieszać dokładnie.\nDolać 2 kwarty octu korzennego, utrzeć 2 jaja i posypać masłem.\nMleć 3 pacierze, zmienić kierunek i udać się do Wielobrzeża Górnego.\n\nBucio piekarz.\n3 kubełki zimnego oślzgłego.\n2 rękawiczki lewe, przetarte, olejowane.	\n\nTam pobrać 13 złotych tokenów Waligóry i wbić 2 jaja do rosołu.\n\nwhile\n    then\n        if albo i nie if\n        else albo belse\nend	24
45	67	easy	Mały moduł na święta	W swięta lubimy makowiec.	Oraz lubimy karpia.\nAlbo i nie lubimy, bo on przecież ginie.\nNo, nie wiem.	21
33	20	easy	Karoca złota, osie platynowe	Rękawiczki ze skóry krokodylej. Stadardowe wyposażenie programisty .NET.	Bez przykładu. Niech se uczeń sam wymyśli.	11
34	29	easy	Wczasy w górach	Moduł łatwy, dla chętnych, rączek nie urywa.	Przykład ciężki. Potwornie męczący. Mąci w zwojach. Klawiaturę grzeje po stronie wschodniej.	14
46	65	easy	Białucha kolczata wąska	13 twardych kasztanów zmieszanych z kozim mlekiem wymieszać dokładnie.\nDolać 2 kwarty octu korzennego, utrzeć 2 jaja i posypać masłem.\nMleć 3 pacierze, zmienić kierunek i udać się do Wielobrzeża Górnego.	Tam pobrać 13 złotych tokenów Waligóry i wbić 2 jaja do rosołu.	26
50	65	easy	Tesst infformattyczny	Bucio piekarz.\n3 kubełki zimnego oślzgłego.\n2 rękawiczki lewe, przetarte, olejowane.	while\n    then\n        if albo i nie if\n        else albo belse\nend	27
51	67	easy	Miętuski	Koń	Ryba	22
49	67	easy	Wał zapowodziowy	Bordo miauczał zaciekle. Wsiudując poniekąd skrętne kaczuszki płynął wytrwale omijając boje. Fala zalewała mu wąsy, a wściekłe meduzy szarpały go za grzbiet i wnętrzności. \nAle Bordo bywał już w gorszych tarapatach. Na przykład, gdy ukradł dźwigowemu kiełbasę. Tam, faktycznie, było blisko, gdy dźwigowy, nie znajdując już innego sposobu cisnął w niego najpierw 20-tonowym żurawiem, a potem całą podstawą czołgodźwigu portowego, usiłując wydobyć z pyska Bordo resztkę skórki, która ugrzęzła mu między zębami.	Siup\nHip\nNóżka	23
67	70	medium	Jasne pola analogowego umysłu	W swięta lubimy makowiec.\n\nBordo miauczał zaciekle. Wsiudując poniekąd skrętne kaczuszki płynął wytrwale omijając boje. Fala zalewała mu wąsy, a wściekłe meduzy szarpały go za grzbiet i wnętrzności. \nAle Bordo bywał już w gorszych tarapatach. Na przykład, gdy ukradł dźwigowemu kiełbasę. Tam, faktycznie, było blisko, gdy dźwigowy, nie znajdując już innego sposobu cisnął w niego najpierw 20-tonowym żurawiem, a potem całą podstawą czołgodźwigu portowego, usiłując wydobyć z pyska Bordo resztkę skórki, która ugrzęzła mu między zębami.\n\nKoń	Oraz lubimy karpia.\nAlbo i nie lubimy, bo on przecież ginie.\nNo, nie wiem.\n\nSiup\nHip\nNóżka\n\nRyba	20
\.


--
-- TOC entry 2243 (class 0 OID 83944)
-- Dependencies: 191
-- Data for Name: edumodule_gamecontext; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY edumodule_gamecontext (edumodule_id, game_score, game_content) FROM stdin;
\.


--
-- TOC entry 2269 (class 0 OID 0)
-- Dependencies: 189
-- Name: edumodule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('edumodule_id_seq', 70, true);


--
-- TOC entry 2237 (class 0 OID 83881)
-- Dependencies: 185
-- Data for Name: enum_diff_level; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY enum_diff_level (difficulty) FROM stdin;
hard
medium
easy
\.


--
-- TOC entry 2254 (class 0 OID 102772)
-- Dependencies: 202
-- Data for Name: enum_distr_type; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY enum_distr_type (type) FROM stdin;
kick
reward
\.


--
-- TOC entry 2238 (class 0 OID 83897)
-- Dependencies: 186
-- Data for Name: enum_user_role; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY enum_user_role (role) FROM stdin;
admin
teacher
student
\.


--
-- TOC entry 2251 (class 0 OID 94585)
-- Dependencies: 199
-- Data for Name: test_code; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY test_code (id, "position", module_id, task_answer) FROM stdin;
\.


--
-- TOC entry 2270 (class 0 OID 0)
-- Dependencies: 198
-- Name: test_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('test_code_id_seq', 1, false);


--
-- TOC entry 2249 (class 0 OID 94568)
-- Dependencies: 197
-- Data for Name: test_question; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY test_question (id, "position", module_id, question_answer) FROM stdin;
13	0	8	Chromolęta - cena, wypłostki i 3 podstawowe zastosowania. Wyjasnij mechanizm namnażania, opisz przydaczki niewklęsłe, maszynowane do wciór.^0^1 buś, wypłaszanie, kronowanie i chuśtkowanie*4 duże konie, krowa, stado lemurów giętkich i rurka-gazówka*200 kun, wygonne podkopy umacniane szkliwem*nie wiem
14	1	8	Grube bale leżą na łące. Kto je poprzynosił, dlaczego i jak zostaną później pocieniowane?^1^Bysio z Dużej, nie zostaną w ogóle.*Ludzie z bagna to przyniesli! to nie my!*Stefan. To zawsze on, przecie waidomo.
15	2	8	Jaka jest kaczka?^2^mała*duża*nijaka*nie wiem
16	3	8	Wór kostek małych to w podstawowej wersji jest:^4^żywnośc dla kota*żywność dla marynarzy na morzu*chrzęszcząca trzęsawka akustyczna*masażer de luxe bez intsrukcji
17	0	37	Chromolęta - cena, wypłostki i 3 podstawowe zastosowania. Wyjasnij mechanizm namnażania, opisz przydaczki niewklęsłe, maszynowane do wciór.^0^1 buś, wypłaszanie, kronowanie i chuśtkowanie*4 duże konie, krowa, stado lemurów giętkich i rurka-gazówka*200 kun, wygonne podkopy umacniane szkliwem*nie wiem
21	0	11	Chromolęta - cena, wypłostki i 3 podstawowe zastosowania. Wyjasnij mechanizm namnażania, opisz przydaczki niewklęsłe, maszynowane do wciór.^0^1 buś, wypłaszanie, kronowanie i chuśtkowanie*4 duże konie, krowa, stado lemurów giętkich i rurka-gazówka*200 kun, wygonne podkopy umacniane szkliwem*nie wiem
22	1	11	Grube bale leżą na łące. Kto je poprzynosił, dlaczego i jak zostaną później pocieniowane?^1^Bysio z Dużej, nie zostaną w ogóle.*Ludzie z bagna to przyniesli! to nie my!*Stefan. To zawsze on, przecie waidomo.
23	2	11	Jaka jest kaczka?^2^mała*duża*nijaka*nie wiem
24	3	11	Wór kostek małych to w podstawowej wersji jest:^4^żywnośc dla kota*żywność dla marynarzy na morzu*chrzęszcząca trzęsawka akustyczna*masażer de luxe bez intsrukcji
25	0	48	Chromolęta - cena, wypłostki i 3 podstawowe zastosowania. Wyjasnij mechanizm namnażania, opisz przydaczki niewklęsłe, maszynowane do wciór.^0^1 buś, wypłaszanie, kronowanie i chuśtkowanie*4 duże konie, krowa, stado lemurów giętkich i rurka-gazówka*200 kun, wygonne podkopy umacniane szkliwem*nie wiem
26	1	48	Grube bale leżą na łące. Kto je poprzynosił, dlaczego i jak zostaną później pocieniowane?^1^Bysio z Dużej, nie zostaną w ogóle.*Ludzie z bagna to przyniesli! to nie my!*Stefan. To zawsze on, przecie waidomo.
27	2	48	Jaka jest kaczka?^2^mała*duża*nijaka*nie wiem
28	3	48	Wór kostek małych to w podstawowej wersji jest:^4^żywnośc dla kota*żywność dla marynarzy na morzu*chrzęszcząca trzęsawka akustyczna*masażer de luxe bez intsrukcji
29	0	48	Chromolęta - cena, wypłostki i 3 podstawowe zastosowania. Wyjasnij mechanizm namnażania, opisz przydaczki niewklęsłe, maszynowane do wciór.^0^1 buś, wypłaszanie, kronowanie i chuśtkowanie*4 duże konie, krowa, stado lemurów giętkich i rurka-gazówka*200 kun, wygonne podkopy umacniane szkliwem*nie wiem
30	1	48	Grube bale leżą na łące. Kto je poprzynosił, dlaczego i jak zostaną później pocieniowane?^1^Bysio z Dużej, nie zostaną w ogóle.*Ludzie z bagna to przyniesli! to nie my!*Stefan. To zawsze on, przecie waidomo.
31	2	48	Jaka jest kaczka?^2^mała*duża*nijaka*nie wiem
32	3	48	Wór kostek małych to w podstawowej wersji jest:^4^żywnośc dla kota*żywność dla marynarzy na morzu*chrzęszcząca trzęsawka akustyczna*masażer de luxe bez intsrukcji
33	0	39	Dlaczego koń. Podaj również rówanie na nierówość z równymi niewiadomymi.^3^ponieważ pies*bez wywaru z mątew dlatego że wczoraj*mrówki również*pozostałe możliwości są niemożliwe
34	1	39	Podaj skład kociołka mnicha w 13 odsłonie^1^2 bity lewe i 4 prawe, bez negacji*pseudo zapytanie do nibybazy*4 piędzie gleby żyznej, 2 kopy kotów średnich, wyciskarka
39	3	46	Górka za stodołą. Wymiary, nachylenie, statystyka wiatrów pólnocno-wschodnich - na wykresie oraz w pseudokodzie.^0^mysiadziura*krotokonik włochaty*studencki kredyt na 50 lat, oprocentowanie tylko 54%*zrzeszenie studentów powolnych
19	1	37	Jaka jest kaczka?^2^mała*duża*nijaka*nie wiem
40	0	42	Pytanie wąskie, próbne, badające.^2^Zdzisław*Zenia z Górki*Mietek Gruszka*Natalia Lekkopióra
20	2	37	Wór kostek małych to w podstawowej wersji jest:^4^żywnośc dla kota*żywność dla marynarzy na morzu*chrzęszcząca trzęsawka akustyczna*masażer de luxe bez intsrukcji
38	2	42	Dlaczego, oraz wbrew zasugeruj trzy możliwości.^2^nie odpowiada, mimo 4 podejść*nie odpowiada mimo 5 podejść*odpowiada ale rzadko mimo 77 podejść
43	4	42	Wymień 3 najwazniejsze cechy dobrego stolika^2^wysokość, gładkość, obłość*uchwyty na ręce i nogi, zapora pod komputer*kolor jaskrawy oczobijny, ledy w krawędzi, pulsujące podświetlenie nocno-dzienne
42	1	42	Chrzęszczące zające rzęziły brzmiąc wrząco. Które więcej?^2^żadne oczywiście*5 pasiastych i 3 kulkowane*wygonny, ten zawsze najbardziej chrzęści*gryzak marchwiaty, ponad wszelką wątpliwość*przyszłe grzmiące brzdące wyjące
18	3	37	Grube bale leżą na łące. Kto je poprzynosił, dlaczego i jak zostaną później pocieniowane?^1^Bysio z Dużej, nie zostaną w ogóle.*Ludzie z bagna to przyniesli! to nie my.*Stefan. To zawsze on, przecie waidomo.
\.


--
-- TOC entry 2271 (class 0 OID 0)
-- Dependencies: 196
-- Name: test_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('test_question_id_seq', 43, true);


--
-- TOC entry 2240 (class 0 OID 83907)
-- Dependencies: 188
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY "user" (id, login, password, role, score, last_module) FROM stdin;
2	Konio	buzdygan	admin	\N	\N
1	pysio	grubasek	teacher	0	28
\.


--
-- TOC entry 2253 (class 0 OID 94616)
-- Dependencies: 201
-- Data for Name: user_code; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_code (user_id, code_id, first_result, result) FROM stdin;
\.


--
-- TOC entry 2247 (class 0 OID 83983)
-- Dependencies: 195
-- Data for Name: user_distractor; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_distractor (user_id, distractor_id, time_last_used) FROM stdin;
1	1	2017-12-29 20:22:07.441738
\.


--
-- TOC entry 2246 (class 0 OID 83968)
-- Dependencies: 194
-- Data for Name: user_edumodule; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_edumodule (user_id, edumodule_id) FROM stdin;
1	1
1	47
1	39
1	37
1	38
1	11
1	33
1	12
1	29
1	28
\.


--
-- TOC entry 2272 (class 0 OID 0)
-- Dependencies: 187
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('user_id_seq', 2, true);


--
-- TOC entry 2252 (class 0 OID 94600)
-- Dependencies: 200
-- Data for Name: user_question; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_question (user_id, question_id, first_result, last_result, last_answer) FROM stdin;
1	21	t	t	0
1	22	f	t	1
1	23	f	f	1
1	24	f	f	1
1	33	f	f	0
1	34	f	f	0
1	13	t	t	0
1	18	f	t	1
1	17	f	f	2
1	19	f	t	2
1	20	f	f	2
1	14	f	t	1
1	15	f	t	2
1	16	f	f	2
\.


--
-- TOC entry 2092 (class 2606 OID 83967)
-- Name: distractor distractor_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY distractor
    ADD CONSTRAINT distractor_pkey PRIMARY KEY (id);


--
-- TOC entry 2090 (class 2606 OID 83951)
-- Name: edumodule_gamecontext edumodule_gamecontext_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule_gamecontext
    ADD CONSTRAINT edumodule_gamecontext_pkey PRIMARY KEY (edumodule_id);


--
-- TOC entry 2088 (class 2606 OID 83933)
-- Name: edumodule edumodule_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule
    ADD CONSTRAINT edumodule_pkey PRIMARY KEY (id);


--
-- TOC entry 2082 (class 2606 OID 83888)
-- Name: enum_diff_level enum_diff_level_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY enum_diff_level
    ADD CONSTRAINT enum_diff_level_pkey PRIMARY KEY (difficulty);


--
-- TOC entry 2106 (class 2606 OID 102779)
-- Name: enum_distr_type enum_distr_type_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY enum_distr_type
    ADD CONSTRAINT enum_distr_type_pkey PRIMARY KEY (type);


--
-- TOC entry 2084 (class 2606 OID 83904)
-- Name: enum_user_role enum_user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY enum_user_role
    ADD CONSTRAINT enum_user_role_pkey PRIMARY KEY (role);


--
-- TOC entry 2100 (class 2606 OID 94594)
-- Name: test_code test_code_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_code
    ADD CONSTRAINT test_code_pkey PRIMARY KEY (id);


--
-- TOC entry 2098 (class 2606 OID 94577)
-- Name: test_question test_question_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_question
    ADD CONSTRAINT test_question_pkey PRIMARY KEY (id);


--
-- TOC entry 2104 (class 2606 OID 102761)
-- Name: user_code user_code_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_code
    ADD CONSTRAINT user_code_pkey PRIMARY KEY (user_id, code_id);


--
-- TOC entry 2096 (class 2606 OID 102759)
-- Name: user_distractor user_distractor_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_distractor
    ADD CONSTRAINT user_distractor_pkey PRIMARY KEY (user_id, distractor_id);


--
-- TOC entry 2094 (class 2606 OID 83972)
-- Name: user_edumodule user_edumodule_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_edumodule
    ADD CONSTRAINT user_edumodule_pkey PRIMARY KEY (user_id, edumodule_id);


--
-- TOC entry 2086 (class 2606 OID 83917)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2102 (class 2606 OID 102757)
-- Name: user_question user_question_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_question
    ADD CONSTRAINT user_question_pkey PRIMARY KEY (user_id, question_id);


--
-- TOC entry 2108 (class 2606 OID 83934)
-- Name: edumodule edumodule_difficulty_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule
    ADD CONSTRAINT edumodule_difficulty_fkey FOREIGN KEY (difficulty) REFERENCES enum_diff_level(difficulty);


--
-- TOC entry 2109 (class 2606 OID 83952)
-- Name: edumodule_gamecontext edumodule_gamecontext_edumodule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule_gamecontext
    ADD CONSTRAINT edumodule_gamecontext_edumodule_id_fkey FOREIGN KEY (edumodule_id) REFERENCES edumodule(id);


--
-- TOC entry 2115 (class 2606 OID 94595)
-- Name: test_code test_code_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_code
    ADD CONSTRAINT test_code_module_id_fkey FOREIGN KEY (module_id) REFERENCES edumodule(id);


--
-- TOC entry 2114 (class 2606 OID 94578)
-- Name: test_question test_question_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_question
    ADD CONSTRAINT test_question_module_id_fkey FOREIGN KEY (module_id) REFERENCES edumodule(id);


--
-- TOC entry 2119 (class 2606 OID 94627)
-- Name: user_code user_code_code_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_code
    ADD CONSTRAINT user_code_code_id_fkey FOREIGN KEY (code_id) REFERENCES test_code(id);


--
-- TOC entry 2118 (class 2606 OID 94622)
-- Name: user_code user_code_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_code
    ADD CONSTRAINT user_code_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2113 (class 2606 OID 83993)
-- Name: user_distractor user_distractor_distractor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_distractor
    ADD CONSTRAINT user_distractor_distractor_id_fkey FOREIGN KEY (distractor_id) REFERENCES distractor(id);


--
-- TOC entry 2112 (class 2606 OID 83988)
-- Name: user_distractor user_distractor_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_distractor
    ADD CONSTRAINT user_distractor_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2111 (class 2606 OID 83978)
-- Name: user_edumodule user_edumodule_edumodule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_edumodule
    ADD CONSTRAINT user_edumodule_edumodule_id_fkey FOREIGN KEY (edumodule_id) REFERENCES edumodule(id);


--
-- TOC entry 2110 (class 2606 OID 83973)
-- Name: user_edumodule user_edumodule_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_edumodule
    ADD CONSTRAINT user_edumodule_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2117 (class 2606 OID 94611)
-- Name: user_question user_question_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_question
    ADD CONSTRAINT user_question_question_id_fkey FOREIGN KEY (question_id) REFERENCES test_question(id);


--
-- TOC entry 2116 (class 2606 OID 94606)
-- Name: user_question user_question_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_question
    ADD CONSTRAINT user_question_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2107 (class 2606 OID 83918)
-- Name: user user_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_role_fkey FOREIGN KEY (role) REFERENCES enum_user_role(role);


--
-- TOC entry 2261 (class 0 OID 0)
-- Dependencies: 3
-- Name: public; Type: ACL; Schema: -; Owner: lmp
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT ALL ON SCHEMA public TO lmp;


-- Completed on 2017-12-29 20:26:06

--
-- PostgreSQL database dump complete
--

