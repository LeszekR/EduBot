--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.0

-- Started on 2018-01-09 19:54:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2261 (class 1262 OID 83167)
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
-- TOC entry 2264 (class 0 OID 0)
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
-- TOC entry 2265 (class 0 OID 0)
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
    parent integer,
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
-- TOC entry 2266 (class 0 OID 0)
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
-- TOC entry 2267 (class 0 OID 0)
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
-- TOC entry 2268 (class 0 OID 0)
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
    last_result boolean DEFAULT false NOT NULL,
    last_answer character varying
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
-- TOC entry 2269 (class 0 OID 0)
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
-- TOC entry 2072 (class 2604 OID 83962)
-- Name: distractor id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY distractor ALTER COLUMN id SET DEFAULT nextval('distractor_id_seq'::regclass);


--
-- TOC entry 2070 (class 2604 OID 83928)
-- Name: edumodule id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule ALTER COLUMN id SET DEFAULT nextval('edumodule_id_seq'::regclass);


--
-- TOC entry 2075 (class 2604 OID 94588)
-- Name: test_code id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_code ALTER COLUMN id SET DEFAULT nextval('test_code_id_seq'::regclass);


--
-- TOC entry 2073 (class 2604 OID 94571)
-- Name: test_question id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_question ALTER COLUMN id SET DEFAULT nextval('test_question_id_seq'::regclass);


--
-- TOC entry 2067 (class 2604 OID 83910)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2247 (class 0 OID 83959)
-- Dependencies: 193
-- Data for Name: distractor; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY distractor (id, type, distr_content) FROM stdin;
1	kick	tekscik_bozonarodzeniowy.html
2	reward	hallo_za_wzgorzem.html 
\.


--
-- TOC entry 2270 (class 0 OID 0)
-- Dependencies: 192
-- Name: distractor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('distractor_id_seq', 2, true);


--
-- TOC entry 2244 (class 0 OID 83925)
-- Dependencies: 190
-- Data for Name: edumodule; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY edumodule (id, parent, difficulty, title, content, example, group_position) FROM stdin;
19	\N	easy	Inkrementacja, dekrementacja	Często korzysta się z operatorów inkrementacji ji dekrementacji.\r\n\r\n- inkrementacja - powiększenie liczby o 1  - operator: "++"\r\n- dekrementacja - zmniejszenie liczby o 1  - operator: "--"\r\n\r\n\r\nInkrementacja i dekrementacja są powszechnie stosowane w pętlach, jak to zobaczymy dalej.	// operatory inkrementacji i dekrementacji\r\n++\r\n--\r\n\r\n// najczęstsze wykorzystanie inkrementacji - w pętli "for" (będzie omówiona dalej)\r\n\r\n// tu i rośnie przy każdym powtórzeniu\r\nfor(var i = 0; i < 5; i++ ) {\r\n    // tu można wykonać inne instrukcje wykorzystując aktualną wartość i\r\n}\r\n\r\n\r\n// tu i maleje przy każdym powtórzeniu\r\nfor(var i = nReps; i > 0; i-- ) {\r\n    // tu można wykonać inne instrukcje wykorzystując aktualną wartość i\r\n}	19
9	\N	easy	Co to jest instrukcja	Instrukcja to jedna linia programu. \r\nChcąc wydać kolejne polecenie programowi piszemy je jako instrukcję.\r\n\r\nJeśli instrukcja jest za długa aby zmieściła się w oknie edytora kodu - można ją zawinąć do kolejnych wierszy.	// prosta instrukcja\r\nvar lubieLoL = 10;\r\n\r\n// długa instrukcja zawinięta dla utrzymania jej czytelności\r\nvar rootElementChildren = document.GetElementById("mainPageSettginsTab")\r\n                                                    .children[4].children[0]\r\n                                                    .GetAttribute("dataTab")["name"]\r\n                                                    .split("_")[3];\r\n\r\n// a tak wyglądałaby bez zawijania\r\nvar rootElementChildren = document.GetElementById("mainPageSettginsTab").children[4].children[0].GetAttribute("dataTab")["name"].split("_")[3];	9
10	\N	easy	Jak napisać instrukcję	Np. utworzenie zmiennej to instrukcja. Przypisanie jej wartości to również instrukcja. \r\n\r\nInstrukcja jest zawsze zakończona znakiem ";".		10
1	\N	easy	Co to jest zmienna	Zmienna to miejsce w pamięci komputera, w którym zapisujemy jakąś wartość.\r\n\r\nMoże to być liczba, albo tekst albo inne rodzaje danych.		1
2	\N	easy	Nazwa zmiennej	Aby używac zmiennej nadajemy jej nazwę. \r\n\r\nNazwa zmiennej powinna być przede wszystkim jednoznaczna - jasno mówić co przechowuje.\r\n\r\nRównoczesnie powinna być możliwie krótka  - to ułatiwa rozumienie kodu.\r\n\r\n\r\nNazwa zmiennej często składa się z kilku słów.\r\n\r\nW JavaScript przyjęto styl "camelback" - tzn.: nazwy zmiennych piszemy małymi literami, pierwsze słowo zaczynamy z małej a każde kolejne słowo zaczynamy z dużej litery.	var liczbaLekcji;\r\n\r\nvar i;\r\n\r\nvar maxLength;\r\n\r\nvar wartMojegoPortfelaPrzedWakac;	2
11	\N	easy	Każda instrukcja w nowej linii	Każdą instrukcję piszemy w nowej linii;\r\n\r\nInstrukcje dla lepszej czytelności kodu często rozdziela się pustymi liniami. Łatwiej zrozumieć kod, gdzie: \r\n- instrukcje są pogrupowane w bloki\r\n- każdy blok wykonuje małe zadanie\r\n- bloki od siebie oddzielone są pustymi liniami.	var lubieLodyOrzech = 120;\r\nvar lubieLodyCzeko = 350;\r\nvar lubieLody = lubieLodyOrzech + lubieLodyCzeko;\r\n\r\nvar lubieRozprawki = -6;\r\n\r\nvar woleRozprawki = lubieRozprawki > lubieLody;\r\n\r\nreturn "Czy wolę rozprawki od lodów? - " + woleRozprawki + "!";	11
12	\N	easy	Co to jest string	Dla komputera tekst to ciąg pojedynczych znaków. \r\nTakim znakiem jest litera, cyfra, spacja, czy znak nowej linii.\r\n\r\n\r\nW programowaniu taki ciąg ma swój typ zmiennej - "string".\r\nDlatego dalej będziemy używać określenia "string", które będzie oznaczało kawałek tekstu.	var hanName = "Han";\r\nvar hanSurname = "Solo";	12
13	\N	easy	Łączenie stringów	Stringi można łączyć ze sobą w dłuższe stringi.\r\n\r\nW JavaScript służy do tego operator "+".	var hanName = "Han";\r\nvar hanSurname = "Solo";\r\nvar han = hanName + " " + hanSurname;\r\n\r\n// teraz wartość zmiennej han to:\r\n"Han Solo"	13
3	\N	easy	Deklaracja zmiennej	W JavaScript zmienne deklaruje się używając słowa kluczowego "var".\r\nPo "var" podajemy nazwę zmiennej.	var boardSize;	3
4	\N	easy	Nadanie wartości teraz lub potem	Wartość zmiennej można jej przypisać:\r\n- albo w chwili jej utworzenia\r\n- albo później.\r\n\r\nTa wartość zostaje zapisana w pamięci komputera.\r\n\r\nNastepnie można ją zmieniać, w miarę wykonywania dalszego kodu.	var boardSize = 5;\r\n\r\nvar riskLevel;\r\nvar playerScore;\r\nriskLevel =  2.3;	4
5	\N	easy	Typy zmiennych proste	Używa się wielu typów zmiennych. Główny podział to typy proste i złożone.\r\n\r\nZmienne proste zawierają jeden element - np.: \r\n- liczbę \r\n- tekst (string)\r\n- wartość logiczną : prawda ("true") lub fałsz ("false")	var nPartsStarWars = 7;\r\n\r\nvar newVader = "Kylo Ren";\r\n\r\nvar deathStarPower = 8000001562.75;\r\n\r\nvar hanLikesLea = true;	5
6	\N	easy	Typy zmiennych złożone	Istnieją różne typy złożone zmiennych .\r\n\r\nTyp złożony przechowuje wiele pojedynczych informacji - np klka liczb, kilka tekstów (stringów).\r\n\r\nW czasie tego kursu będziemy wykorzystywali jeden z nich - tablice.\r\n(Nauczymy się używać tablic w dalszej części kursu.)	// tablica\r\nvar millHawkCrew = ["Han Solo", "Chewbacca", "R2-D2"; "C3PO"];\r\n\r\n// obiekt\r\nvar badGuys = {\r\n    cleverBoss: "Imperator", \r\n    complicatedOne: "Darth Vader", \r\n    nMaxSiths: 3\r\n};	6
7	\N	easy	Przypisanie wartości zmiennej prostej przy utworzeniu	Wartośc można nadać zmiennej od razu przy jej tworzeniu. \r\n\r\nW takim przypadku po nazwie zmiennej piszemy znak "=" a dalej wartość i kończymy znakiem ";".	var maxNPaczkow = 21;	7
8	\N	easy	Przypisanie wartości w osobnej instrukcji	Można też zmienną utworzyć na razie nie nadając jej żadnej wartości.\r\n\r\nWartość zostaje nadana później w trakcie wykonywania dalszych instrukcji programu.	var maxNPaczkow;\r\nmaxNPaczkow = 21;	8
14	\N	easy	Zamiana stringu na liczbę	Jeżeli string zawiera \r\n\r\n- tylko cyfry\r\n- lub tylko cyfry i jeden znak kropki (separator miejsc dziesiętnych)\r\n- oraz ewentualnie znak "-" lub "+"\r\n\r\nto możemy go zamienić na typ liczbowy stosując składnię "Number(naszTekst)".	var yodasAgeString = "853";\r\nvar yodasAgeInt = Number(yodasAgeString);\r\n\r\nvar yodaTall = Number("114");	14
15	\N	easy	Zamiana liczby w string	Można również zmienić liczbę w string.\r\n\r\nW JavaScript można dołączyć liczbę do istniejącego stringu i zostanie ona automatycznie zamieniona na string.		15
16	\N	easy	Operator - co to jest	Operator to znak lub para znaków które wydają polecenie wykonania jakiejś operacji na zmiennych.\r\n\r\nTe operacje to np: dodanie dwóch liczb, odejmowanie, łączenie stringów, porównanie wielkości (równe, większe, mniejsze, itd.).\r\n\r\nDla typu logicznego ("true", "false") używa się operatorów \r\n- oraz:   "&&"\r\n- lub:   "||"	\r\n// przykładowe operatory przypisania wartości\r\n=    przypisanie wartość\r\n+=    dodanie liczby lub dołączenie stringu\r\n*=    pomnożenie przez liczbę\r\n\r\n// przykładowe operatory matematyczne\r\n+    dodawanie\r\n-    odejmowanie\r\n*    mnożenie\r\n/    dzielenie\r\n\r\n// przykładowe operatory porównania\r\n==    równy\r\n<    mniejszy\r\n>    większy\r\n<=    mniejszy lub równy\r\n>=    większy lub równy\r\n\r\n// przykładowe operatory logiczne\r\n&&    oraz\r\n||    lub	16
17	\N	easy	Przypisanie	Znak "=", który widzieliśmy już wczesnie to operator przypisania. Przypisuje on wartość zmiennej.	var bestGame = "Lubię grać";	17
18	\N	easy	Operacja z przypisaniem	Często korzysta się z operatorów łączących prostą operację z przypisaniem. \r\n\r\nW efekcie zmienna po lewej stronie operatora jest poddawana działaniu, a następnie od razu wynik tego działania zostaje w niej zapisany jako jej nowa wartość.	var bestGame = "Lubię grać w: "; \r\nbestGame += "Overwatch";\r\nbestGame += ", Wiedźmin.";\r\n\r\n// teraz bestGame ma wartość: \r\n"Lubię grać w: Overwatch, Wiedźmin."\r\n\r\n// --------------------------------------------------------\r\nvar wynik = 750;\r\nvar nGier = 30;\r\nwynik /= nGier;    // dzielimy wynik przez nGier i od razu zapamiętujemy uzyskaną wartość w zmiennej "wynik"\r\n\r\n// teraz wynik ma wartość:\r\n250	18
\.


--
-- TOC entry 2245 (class 0 OID 83944)
-- Dependencies: 191
-- Data for Name: edumodule_gamecontext; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY edumodule_gamecontext (edumodule_id, game_score, game_content) FROM stdin;
\.


--
-- TOC entry 2271 (class 0 OID 0)
-- Dependencies: 189
-- Name: edumodule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('edumodule_id_seq', 19, true);


--
-- TOC entry 2239 (class 0 OID 83881)
-- Dependencies: 185
-- Data for Name: enum_diff_level; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY enum_diff_level (difficulty) FROM stdin;
hard
medium
easy
\.


--
-- TOC entry 2256 (class 0 OID 102772)
-- Dependencies: 202
-- Data for Name: enum_distr_type; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY enum_distr_type (type) FROM stdin;
kick
reward
\.


--
-- TOC entry 2240 (class 0 OID 83897)
-- Dependencies: 186
-- Data for Name: enum_user_role; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY enum_user_role (role) FROM stdin;
admin
teacher
student
\.


--
-- TOC entry 2253 (class 0 OID 94585)
-- Dependencies: 199
-- Data for Name: test_code; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY test_code (id, "position", module_id, task_answer) FROM stdin;
41	0	7	Utwórz zmienną "mojMaxNPaczkow" 32.^^// STUDENT_CODE_HERE\r\nreturn mojMaxNPaczkow;^javascript^32
42	0	8	Utwórz zmienną "mojMaxNPaczkow".\r\nPrzypisz jej wartosc 34;^^// STUDENT_CODE_HERE\r\nreturn mojMaxNPaczkow;^javascript^34
43	0	10	Utwórz instrukcję w której tworzysz zmienną "lubieRozprawki" i przypisujesz jej wartość:   -9.\r\n(UWAGA - nie pomiń minusa przed dziwiątką - to znak liczby, a nie myślnik.)^^// STUDENT_CODE_HERE\r\nreturn lubieRozprawki;^javascript^-9
44	0	11	Napisz 3 instrukcje:\r\nUtwórz zmienną "mamNaKoncie" i przypisz jej wartość 240.\r\nUtwórz zmienną "wyciagneOdMamy" i przypisz jej wartość: 50.\r\nUtwórz zmienną "mogeWydac" i przypisz jej wartość jako sumę poprzednich dwóch zmiennych.^^// STUDENT_CODE_HERE\r\nreturn mogeWydac;^javascript^290
45	0	12	Utwórz zmienną "hanShip"  i przypisz jej wartość "MilleniumHawk".^^// STUDENT_CODE_HERE\r\nreturn hanShip;^javascript^"MilleniumHawk"
46	0	13	x^^x^x^x
47	0	14	Utwórz zminną "milHawkCrew" i przypisz jej wartość 2.\r\nUtwórz zmienną "milHawkForce" i przypisz jej liczbe 2 używając zmiennej "milHawkCrew</coed>.^^// STUDENT_CODE_HERE\r\nreturn milHawkForce;^javascript^2
48	0	15	Utwórz zmienne:\r\n-  "mojUlubioniyNr" i przypisz jej wartość "Mój ulubiony numer to: ",\r\n-  "magicznyNumerek" i przypisz jej wartość 13.\r\n\r\nUtwórz zmienną "luckyNumber" i przypisz jej wartość łącząc ze sobą uwtorzone zmienne tak jak łączy się stringi ("mojUlubioniyNr" jako pierwszy i "magicznyNumerek" jako drugi element).^^// STUDENT_CODE_HERE\r\nreturn luckyNumber;^javascript^"Mój ulubiony numer to: 13"
49	0	18	Utwórz zmienną "boardHtml"  i przypisz jej wartość "<table>".\r\nDołącz do niej string: "<tr>" - używając operacji z przypisaniem.\r\nDołącz do niej string: "</tr>" -  używając operacji z przypisaniem.\r\nDołącz do niej string: "</table>" -  używając operacji z przypisaniem.\r\n\r\nW taki sposób tworzy się w JavaScript nowy element HTML - tu: tabelkę z wierszem. Tak utworzony string mozna następnie wstawić na stronę (zobaczysz jak w dalszej części kursu).^^// TODO - dorobić executorCode^javascript^// TODO - dorobić correctResult
50	0	19	Utwórz zmienną "mojaPizza" i przypisz jej wartość 6;\r\n4 razy zdekrementuj tę zmienną, 3 razy inkrementuj. Kolejność zjadania (dekrementacji) i dokładek inkrementacji)) pizzy jest dowolna. ^^// STUDENT_CODE_HERE\r\nreturn mojaPizza;^javascript^3
\.


--
-- TOC entry 2272 (class 0 OID 0)
-- Dependencies: 198
-- Name: test_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('test_code_id_seq', 50, true);


--
-- TOC entry 2251 (class 0 OID 94568)
-- Dependencies: 197
-- Data for Name: test_question; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY test_question (id, "position", module_id, question_answer) FROM stdin;
\.


--
-- TOC entry 2273 (class 0 OID 0)
-- Dependencies: 196
-- Name: test_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('test_question_id_seq', 1, false);


--
-- TOC entry 2242 (class 0 OID 83907)
-- Dependencies: 188
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY "user" (id, login, password, role, score, last_module) FROM stdin;
2	Konio	buzdygan	admin	\N	\N
1	pysio	grubasek	teacher	0	31
\.


--
-- TOC entry 2255 (class 0 OID 94616)
-- Dependencies: 201
-- Data for Name: user_code; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_code (user_id, code_id, first_result, last_result, last_answer) FROM stdin;
\.


--
-- TOC entry 2249 (class 0 OID 83983)
-- Dependencies: 195
-- Data for Name: user_distractor; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_distractor (user_id, distractor_id, time_last_used) FROM stdin;
\.


--
-- TOC entry 2248 (class 0 OID 83968)
-- Dependencies: 194
-- Data for Name: user_edumodule; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_edumodule (user_id, edumodule_id) FROM stdin;
1	1
\.


--
-- TOC entry 2274 (class 0 OID 0)
-- Dependencies: 187
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('user_id_seq', 2, true);


--
-- TOC entry 2254 (class 0 OID 94600)
-- Dependencies: 200
-- Data for Name: user_question; Type: TABLE DATA; Schema: public; Owner: lmp
--

COPY user_question (user_id, question_id, first_result, last_result, last_answer) FROM stdin;
\.


--
-- TOC entry 2093 (class 2606 OID 83967)
-- Name: distractor distractor_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY distractor
    ADD CONSTRAINT distractor_pkey PRIMARY KEY (id);


--
-- TOC entry 2091 (class 2606 OID 83951)
-- Name: edumodule_gamecontext edumodule_gamecontext_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule_gamecontext
    ADD CONSTRAINT edumodule_gamecontext_pkey PRIMARY KEY (edumodule_id);


--
-- TOC entry 2089 (class 2606 OID 83933)
-- Name: edumodule edumodule_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule
    ADD CONSTRAINT edumodule_pkey PRIMARY KEY (id);


--
-- TOC entry 2083 (class 2606 OID 83888)
-- Name: enum_diff_level enum_diff_level_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY enum_diff_level
    ADD CONSTRAINT enum_diff_level_pkey PRIMARY KEY (difficulty);


--
-- TOC entry 2107 (class 2606 OID 102779)
-- Name: enum_distr_type enum_distr_type_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY enum_distr_type
    ADD CONSTRAINT enum_distr_type_pkey PRIMARY KEY (type);


--
-- TOC entry 2085 (class 2606 OID 83904)
-- Name: enum_user_role enum_user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY enum_user_role
    ADD CONSTRAINT enum_user_role_pkey PRIMARY KEY (role);


--
-- TOC entry 2101 (class 2606 OID 94594)
-- Name: test_code test_code_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_code
    ADD CONSTRAINT test_code_pkey PRIMARY KEY (id);


--
-- TOC entry 2099 (class 2606 OID 94577)
-- Name: test_question test_question_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_question
    ADD CONSTRAINT test_question_pkey PRIMARY KEY (id);


--
-- TOC entry 2105 (class 2606 OID 102761)
-- Name: user_code user_code_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_code
    ADD CONSTRAINT user_code_pkey PRIMARY KEY (user_id, code_id);


--
-- TOC entry 2097 (class 2606 OID 102759)
-- Name: user_distractor user_distractor_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_distractor
    ADD CONSTRAINT user_distractor_pkey PRIMARY KEY (user_id, distractor_id);


--
-- TOC entry 2095 (class 2606 OID 83972)
-- Name: user_edumodule user_edumodule_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_edumodule
    ADD CONSTRAINT user_edumodule_pkey PRIMARY KEY (user_id, edumodule_id);


--
-- TOC entry 2087 (class 2606 OID 83917)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2103 (class 2606 OID 102757)
-- Name: user_question user_question_pkey; Type: CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_question
    ADD CONSTRAINT user_question_pkey PRIMARY KEY (user_id, question_id);


--
-- TOC entry 2109 (class 2606 OID 83934)
-- Name: edumodule edumodule_difficulty_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule
    ADD CONSTRAINT edumodule_difficulty_fkey FOREIGN KEY (difficulty) REFERENCES enum_diff_level(difficulty);


--
-- TOC entry 2111 (class 2606 OID 83952)
-- Name: edumodule_gamecontext edumodule_gamecontext_edumodule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule_gamecontext
    ADD CONSTRAINT edumodule_gamecontext_edumodule_id_fkey FOREIGN KEY (edumodule_id) REFERENCES edumodule(id);


--
-- TOC entry 2110 (class 2606 OID 102805)
-- Name: edumodule edumodule_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY edumodule
    ADD CONSTRAINT edumodule_parent_fk FOREIGN KEY (parent) REFERENCES edumodule(id);


--
-- TOC entry 2117 (class 2606 OID 94595)
-- Name: test_code test_code_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_code
    ADD CONSTRAINT test_code_module_id_fkey FOREIGN KEY (module_id) REFERENCES edumodule(id);


--
-- TOC entry 2116 (class 2606 OID 94578)
-- Name: test_question test_question_module_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY test_question
    ADD CONSTRAINT test_question_module_id_fkey FOREIGN KEY (module_id) REFERENCES edumodule(id);


--
-- TOC entry 2121 (class 2606 OID 94627)
-- Name: user_code user_code_code_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_code
    ADD CONSTRAINT user_code_code_id_fkey FOREIGN KEY (code_id) REFERENCES test_code(id);


--
-- TOC entry 2120 (class 2606 OID 94622)
-- Name: user_code user_code_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_code
    ADD CONSTRAINT user_code_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2115 (class 2606 OID 83993)
-- Name: user_distractor user_distractor_distractor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_distractor
    ADD CONSTRAINT user_distractor_distractor_id_fkey FOREIGN KEY (distractor_id) REFERENCES distractor(id);


--
-- TOC entry 2114 (class 2606 OID 83988)
-- Name: user_distractor user_distractor_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_distractor
    ADD CONSTRAINT user_distractor_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2113 (class 2606 OID 83978)
-- Name: user_edumodule user_edumodule_edumodule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_edumodule
    ADD CONSTRAINT user_edumodule_edumodule_id_fkey FOREIGN KEY (edumodule_id) REFERENCES edumodule(id);


--
-- TOC entry 2112 (class 2606 OID 83973)
-- Name: user_edumodule user_edumodule_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_edumodule
    ADD CONSTRAINT user_edumodule_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2119 (class 2606 OID 94611)
-- Name: user_question user_question_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_question
    ADD CONSTRAINT user_question_question_id_fkey FOREIGN KEY (question_id) REFERENCES test_question(id);


--
-- TOC entry 2118 (class 2606 OID 94606)
-- Name: user_question user_question_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY user_question
    ADD CONSTRAINT user_question_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2108 (class 2606 OID 83918)
-- Name: user user_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: lmp
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_role_fkey FOREIGN KEY (role) REFERENCES enum_user_role(role);


--
-- TOC entry 2263 (class 0 OID 0)
-- Dependencies: 3
-- Name: public; Type: ACL; Schema: -; Owner: lmp
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT ALL ON SCHEMA public TO lmp;


-- Completed on 2018-01-09 19:54:45

--
-- PostgreSQL database dump complete
--

