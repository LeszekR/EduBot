--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.0

-- Started on 2018-01-14 13:52:04

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
35	34	easy	Zewnętrzne pudełko - "html"	Wszystkie pudełka, z których zbudowana jest strona internetowa znajdują się w jednym, głównym pudełku - jego tag to <html>.\r\n\r\nPudełko <html></html> rozciąga się na całe okno przeglądarki.		35
36	34	easy	Pierwsze dzieci: "head" i "body"	W pudełku "html" znajdują się 2 pudełka zawierające 2 główne składniki strony: \r\n- pudełko "head" (nie będziemy się nim tu zajmowali),\r\n- pudełko "body" - tu znajduje się wszystko co widzisz na stronie internetowej.	<html>\r\n\r\n    <head>\r\n    </head>\r\n\r\n    <body>\r\n        <div>\r\n            ….\r\n        </div>\r\n    </body>\r\n\r\n</html>	36
38	37	easy	Tag <div>	Tag <div> jest najczęściej stosowany.\r\n\r\nTworzy on pudełko, do którego wkłada się kolejne div-y lub inne elementy DOM.	<div>\r\n\r\n</div>	38
39	37	easy	Tag <input> - typy	Tag <input> służy do wpisywania danych i wywoływania akcji na stronie.\r\n\r\nWystępuje w kilku typach. Dwa z nich to:\r\n- type="text"   : tworzy pole tekstowe, w które można wpisać liczbę lub tekst\r\n- type="button"  : tworzy przycisk do którego można przypisać funkcję JavaScript	<input type="text" id="textFigthLength">\r\n\r\n<input type="button" value="Atakuj"  click="millHawkAttack()">\r\n	39
40	37	easy	tag <script>	Tag <script> tworzy miejsce, w którym umieszcza się kod JavaScript.\r\n\r\nMożna go umieścić w "body".\r\n\r\nWewnątrz pisze się kod JavaScript, który ma działać na tej stronie internetowej.\r\n\r\n(Jeśli kod JavaScript jest dłuższy, to umieszcza się go w osobnych plikach z rozszerzeniem .js. Te pliki importuje się do HTML umieszczając ich adresy w elemencie "script" umieszczonym w "head". Ale w tym kursie my umieścimy Twój kod w elemencie "script" tak, żeby działał.)	<script>\r\n    function countTheEnemy() {\r\n        var empireFleet = 210;\r\n        var bountyHunters = 15;\r\n        return empireFleet + bountyHunters;\r\n    }\r\n</script>	40
42	41	easy	Co to jest atrybut elementu DOM	"Atrybut" elementu DOM to jakaś jego właściwość, którą może ustawić i odczytać programista.\r\n\r\nAtrybuty ustawia się wewnątrz tagu - za znakiem "<" oraz nazwą tagu, a przed znakiem ">".\r\n\r\nOddziela się je od nazwy tagu oraz od siebie nawzajem pojedynczą spacją.	<div id="planAkcji">\r\n    ….\r\n   <input type="button" value="Atakuj"  click="millHawkAttack()">\r\n    ….\r\n</div>\r\n	42
43	41	easy	Atrybut "id" elementu	Atrybut "id" elementu to jego identyfikator.\r\n\r\nMusi on być unikalny - jedyny taki w całym drzewie DOM.\r\n\r\nElementy drzewa DOM to obiekty - osobne fragmenty strony. Ich atrybuty można odczytywać i zmieniać. Atrybut "id" pozwala odnaleźć dany element w drzewie DOM. Dlatego "id" musi być unikalne.	<div id="divPrzyciskiAkcja">\r\n    ….\r\n   <input id="przycAtak">\r\n   <input id="przycHipernaped">\r\n    ….\r\n</div>\r\n	43
44	41	easy	Atrybuty elementu <input>	Element <input> wymaga kilku atrybutów aby działał:\r\n- atrybut "type": "button" utworzy przycisk, "text" utworzy pole tekstowe\r\n- atrybut "value": ustawia tekst wyświetlany w tym elemencie\r\n- atrybut "click": ustawia funkcję JavaScript, którą uruchomi kliknięcie	   <input id="przycAtak" type="button" value="Atakuj">\r\n	44
47	46	easy	Do czego służy JavaScript	JavaScript to język, w którym pisze się procedury, które coś robią i coś zmieniają.\r\n\r\nPrzykłady:\r\n- coś obliczają i wyświetlają wynik,\r\n- zmieniają wygląd strony,\r\n- pobierają dane z Internetu,\r\n- itd.		47
48	46	easy	Elementy wywołujące akcję	Funkcje JavaScript wywoływane są przez klikanie elementów DOM.\r\n\r\nNp. przycisk "przycAtak" tu wywołuje funkcję JavaScript "millHawkAttack()".\r\n\r\nPrzypisanie funkcji JavaScript do elementu "input" typu "button" dokonuje się przez przypisanie tej funkcji do atrybutu "click" tego przycisku. \r\n\r\n(O funkcjach JavaScript będziemy mówili dalej.)	   <input id="przycAtak" type="button" value="Atakuj"  click="millHawkAttack()">\r\n	48
50	49	easy	Co to jest komentarz	"Komentarz" to linia lub kilka linii w kodzie programu, które są niewidoczne dla komputera.\r\n\r\nAby były niewidoczne poprzedza się je podwójnym slash-em.\r\n\r\nBez "//" na początku komentarz powoduje błąd kompilacji, ponieważ jest niezrozumiały dla komputera.	// Ta linia zaczyna się od "//"  -  to jest właśnie "komentarz"\r\n\r\nta linia nie zaczyna się od "//" i nie jest kodem - jak widzisz edytor wskazuje błąd	50
51	49	easy	Co czego służy komentarz	Komentarz wyjaśnia krótko i jasno fragment kodu, który znajduje się za nim.\r\n\r\nKomentarze są bardzo ważne - pozwalają dużo szybciej zrozumieć kod. \r\n\r\nKażdy programista wie, że nawet jego własny kod po krótkim czasie wymaga wysiłku aby go zrozumieć. Ten wysiłek niepotrzebnie pochłania czas. \r\n\r\nDlatego każdy dobry programista pisze dużo komentarzy, bo to trwa krócej i jest łatwiejsze niż analiza kodu. Źli programiści nie piszą. Do ciebie należy wybór kim będziesz ;)	var boardSize = 5;\r\nvar boardTable = [boardSize][boardSize];\r\nvar youAreKilled = false;\r\n\r\n\r\n// -------------------------------------------------------\r\n// fragment kodu bez komentarza - o co w nim chodzi?\r\n\r\nfor (var r = 0; r < boardSize; r++)\r\n    for (var c = 0; c < boardSize; c++)\r\n        if (boardTable[r][c] == 1) {\r\n            BAM(r, c);\r\n            youAreKilled = true;\r\n        }\r\n\r\n\r\n\r\n// -------------------------------------------------------\r\n// ten sam kod z komentarzem\r\n\r\n// Zdetonowanie wszystkich min na tablicy i zabicie sapera\r\nfor (var r = 0; r < boardSize; r++)\r\n    for (var c = 0; c < boardSize; c++)\r\n        if (boardTable[r][c] == 1) {\r\n            BAM(r, c);\r\n            youAreKilled = true;\r\n        }	51
22	21	easy	HTML - konstrukcja strony	HTML to język, który buduje szkielet strony. \r\n\r\nSzkielet strony można porównać do wielu pudełek powkładanych jedne w drugie. Aby utworzyć te pudełka i przydzielić im miejsce - pisze się HTML. Jedno takie pudełko to prostokąt wydzielony na ekranie. Strona to wiele coraz mniejszych prostokątów w innych prostokątach.\r\n\r\nKod HTML to jednoznaczna instrukcja dla przeglądarki z czego i jak zbudować stronę. To taka sama instrukcja jak instrukcja składania mebla albo zestawu LEGO. Jedyna różnica to ta, że przeglądarka sama na miejscu wytwarza potrzebne elementy.		22
54	53	easy	Po co kod ma być czytelny	Każdy program to od kilkudziesięciu linii do kilkudziesięciu tysięcy linii kodu.\r\n\r\nBudowanie i rozwijanie programu trwa wiele miesięcy lub lat.\r\n\r\nAby zrozumieć nawet własny kod po paru tygodniach od napisania każdy programista musi go analizować na nowo. Zrozumienie cudzego kodu jest jeszcze trudniejsze.\r\n\r\nDlatego jednym z kryteriów dobrego kodu jest jego czytelność - czyli jak łatwo jest zrozumieć co on robi.		54
55	53	easy	Czytelność dla ciebie	Pracując nad programem zawsze wracasz do fragmentów napisanych wcześniej. \r\n\r\nAby poprawiać i korzystać z tego co już stworzyłeś musisz rozumieć jak to działa.		55
56	53	easy	Czytelność dla innych	Niemal każdy program jest tworzony przez co najmniej kilku programistów.\r\n\r\nKażdy taki programista korzysta i zmienia fragmenty napisane przez kolegów.\r\n\r\nZrozumienie cudzego kodu jest trudniejsze niż zrozumienie własnego.		56
57	53	easy	Co decyduje o czytelności kodu	O czytelności kodu decyduje kilka elementów.\r\n\r\n- nazwy zmiennych i funkcji,\r\n- komentarze,\r\n- puste linie dzielące kod na wyraźnie widoczne bloki.		57
58	53	easy	Nazwy zmiennych i funkcji	Dobra nazwa:\r\n- jasno mówi co przechowuje dana zmienna lub co robi dana funkcja\r\n- jest możliwie krótka (optymalnie od 1 do 3 wyrazów)\r\n- wyraźnie, na pierwszy rzut oka różni się od innych 	// nazwy zmiennych, które nic nie mówią\r\nvar etta = 10;\r\nvar ivc = true;\r\n\r\n// nazwy zmiennych, które są zrozumiałe\r\nvar enemyArrivalTime = 10;\r\nvar isVaderComing = true;\r\n\r\n// zmienne mniej i zmienne więcej mówiące\r\nvar enemyArrival = 10;\r\nvar enemyArrivalTime = 10;\r\nvar enemyArrivalTimeSec = 10;\r\n\r\n// nazwa funkcji zbyt długa i nazwa dobra\r\nfunction generateEnemyBaseSpatialDistributionModel() {}\r\nfunction makeEnemyMap() {}\r\n	58
23	21	easy	CSS - wygląd strony	Kod CSS ustawia wygląd wszystkich pudełek strony www.\r\n\r\nW ramach tego kursu nie będziemy się nim zajmowali. \r\n\r\n(Ćwiczenia przygotowane dalej otrzymują gotowy kod CSS.)		23
24	21	easy	JavaScript - akcje	JavaScript to język, bez którego strona po wczytaniu pozostawałaby zawsze nie zmieniona i oprócz linków do innych adresów nic innego by na niej nie działało.\r\n\r\nW JavaScript napisane są procedury, które ożywiają stronę\r\n- działają przyciski,\r\n- można coś wpisać do pól formularzy i to wpływa na dalsze akcje,\r\n- strona zmienia wygląd.		24
60	59	easy	Pisz komentarze - potem kod	Programista najłatwiej i najszybciej pisze kod, gdy przedtem zaplanował wszystkie jego części.\r\n\r\nDlatego bardzo dobrą praktyką jest :\r\n- NAJPIERW napisać serię komentarzy - w których znajdą się wszystkie części kodu.\r\n- POTEM pod komentarzami napisać kod, który robi to co w komentarzu.\r\n\r\nZazwyczaj taki plan obejmuje kod jednej funkcji (funkcje to fragmenty kodu wykonujące jakąś określoną czynność- dowiesz o nich więcej w dalszej części).\r\n\r\nBardzo często dodaje się również komentarze po napisaniu kodu, gdy jasne się staje że dany fragment tego wymaga dla szybszego zrozumienia.	// Przykład komentarzy poprzedzających napisanie kodu\r\n// -------------------------------------------------------------------\r\n\r\n\r\n// utwórz mapę bazy sił Rebelii\r\n\r\n    // utwórz tabelkę html mapy\r\n\r\n    // utwórz tablicę oddziałów Rebelii\r\n\r\n    // ustaw liczebność oddziałów na mapie\r\n\r\n\r\n// oblicz punkt uderzenia z Gwiazdy Śmierci\r\n\r\n    // sprawdź stopień naładowania generatorów\r\n\r\n    // zsumuj poziom frustracji wszystkich Sithów i ich generałów\r\n\r\n    // oblicz trajektorię uderzenia w zależności od sumy energii\r\n\r\n\r\n// usuń rebeliantów z kwadratu, który ulegnie zniszczeniu	60
61	59	easy	Ile pisać komentarzy	Na 1 ekranie kodu powinno być kilka komentarzy.\r\n\r\nIch liczba jest większa gdy kod jest trudniejszy.\r\n\r\nIch liczba jest mniejsza gdy kod jest oczywisty, a nazwy zmiennych i funkcji są czytelne - wiadomo co w nich jest.		61
62	59	easy	Pisz zwięźle ale jasno	Większość komentarzy to maksymalnie 1 linia tekstu.\r\n\r\nNiektóre komentarze mogą mieć wiele linii. Pisz takie wtedy, gdy czytającemu potrzebne jest ogólne wyjaśnienie jak to działa ta część programu.	// (komentarz krótki: ) Kylo Ren niszczy 5 z 12 X-Wingów\r\n\r\n\r\n// (Komentarz długi: ) \r\n// Optymalizacjia reakcji Rebleiantów odbywa się w 3 krokach:\r\n//    1. utworzenie aktualnej mapy bazy sił Rebelii\r\n//    2. obliczenie punktu uderzenia z Gwiazdy Śmierci\r\n//    3. usunięcie sił z kwadratu, który ulegnie zniszczeniu\r\n//\r\n// UWAGA: poziom frustracji Sithów zmienia się losowo.	62
64	63	easy	Do czego służą puste linie	Puste linie oddzielają od siebie fragmenty kodu.\r\n\r\nWizualnie ułatwiają analizę jego fragmentów - mózg szybciej rozumie dobrze poukładane grupy instrukcji.\r\n\r\nMożesz je zaobserwować we wszytskich przykładach tego kursu.		64
65	63	easy	Gdzie wstawiać puste linie	Zawsze wstawiaj min 1 pustą linię przed komentarzem.\r\n\r\nGrupuj instrukcje składające się na jeden mały efekt. Zawsze oddzielaj takie grupy pojedynczą pustą linią.\r\n\r\nOddzielaj od siebie dwiema pustymi liniami dłuższe, logicznie powiązane fragmenty kodu, składające się z wielu grup.		65
68	67	easy	Co to jest zmienna	Zmienna to miejsce w pamięci komputera, w którym zapisujemy jakąś wartość.\r\n\r\nMoże to być liczba, albo tekst albo inne rodzaje danych.		68
69	67	easy	Nazwa zmiennej	Aby używac zmiennej nadajemy jej nazwę. \r\n\r\nNazwa zmiennej powinna być przede wszystkim jednoznaczna - jasno mówić co przechowuje.\r\n\r\nRównoczesnie powinna być możliwie krótka  - to ułatwia rozumienie kodu.\r\n\r\n\r\nNazwa zmiennej często składa się z kilku słów.\r\n\r\nW JavaScript przyjęto styl "camelback" - tzn.: \r\n- nazwy zmiennych i funkcji piszemy małymi literami,\r\n- pierwsze słowo zaczynamy z małej, \r\n- każde kolejne słowo zaczynamy z dużej litery.	var liczbaLekcji;\r\n\r\nvar i;\r\n\r\nvar maxLength;\r\n\r\nvar wartMojegoPortfelaPrzedWakac;	69
71	70	easy	Deklaracja zmiennej	W JavaScript zmienne deklaruje się używając słowa kluczowego "var".\r\n\r\nPo "var" podajemy nazwę zmiennej.	var boardSize;	71
72	70	easy	Nadanie wartości teraz lub potem	Wartość zmiennej można jej przypisać:\r\n- albo w chwili jej utworzenia,\r\n- albo później.\r\n\r\nTa wartość zostaje zapisana w pamięci komputera.\r\n\r\nNastepnie można ją zmieniać, w miarę wykonywania dalszego kodu.	var boardSize = 5;\r\n\r\nvar riskLevel;\r\nvar playerScore;\r\nriskLevel =  2.3;	72
75	74	easy	Typy zmiennych proste	Używa się wielu typów zmiennych. Główny podział to typy proste i złożone.\r\n\r\nZmienne proste zawierają jeden element - np.: \r\n- liczbę,\r\n- tekst (string),\r\n- wartość logiczną : prawda ("true") lub fałsz ("false").	var nPartsStarWars = 7;\r\n\r\nvar newVader = "Kylo Ren";\r\n\r\nvar deathStarPower = 8000001562.75;\r\n\r\nvar hanLikesLea = true;	75
70	66	medium	Wartość zmiennej	________________________________________________________\n1)\nW JavaScript zmienne deklaruje się używając słowa kluczowego "var".\r\n\r\nPo "var" podajemy nazwę zmiennej.\n\n\n________________________________________________________\n2)\nWartość zmiennej można jej przypisać:\r\n- albo w chwili jej utworzenia,\r\n- albo później.\r\n\r\nTa wartość zostaje zapisana w pamięci komputera.\r\n\r\nNastepnie można ją zmieniać, w miarę wykonywania dalszego kodu.	//1) ---------------------------------------------------\nvar boardSize;\n\n\n//2) ---------------------------------------------------\nvar boardSize = 5;\r\n\r\nvar riskLevel;\r\nvar playerScore;\r\nriskLevel =  2.3;	70
76	74	easy	Typy zmiennych złożone	Istnieją wiele złożonych typów zmiennych .\r\n\r\nTyp złożony przechowuje wiele pojedynczych informacji - np wiele liczb, wiele tekstów (stringów).\r\n\r\nW czasie tego kursu będziemy wykorzystywali jeden z nich - tablice.\r\n(Nauczymy się używać tablic w dalszej części kursu.)	// tablica\r\nvar millHawkCrew = ["Han Solo", "Chewbacca", "R2-D2", "C3PO"];\r\n\r\n// obiekt\r\nvar badGuys = {\r\n    cleverBoss: "Imperator", \r\n    complicatedOne: "Darth Vader", \r\n    nMaxSiths: 3\r\n};	76
78	77	easy	Przypisanie wartości przy utworzeniu	Wartośc można nadać zmiennej od razu przy jej tworzeniu. \r\n\r\nW takim przypadku po nazwie zmiennej piszemy znak "=" a dalej wartość i kończymy znakiem ";".	var maxNPaczkow = 21;	78
79	77	easy	Przypisanie wartości w osobnej instrukcji	Można też zmienną utworzyć na razie nie nadając jej żadnej wartości.\r\n\r\nWartość zostaje nadana później w trakcie wykonywania dalszych instrukcji programu.	var maxNPaczkow;\r\nmaxNPaczkow = 21;	79
82	81	easy	Co to jest instrukcja	Instrukcja to jedna linia programu zakończona średnikiem. \r\nChcąc wydać programowi kolejne polecenie piszemy je jako instrukcję.\r\n\r\nJeśli instrukcja jest za długa aby zmieściła się w oknie edytora kodu - można ją zawinąć do kolejnych wierszy. Średnik stawia się na końcu ostatniego wiersza.	// prosta instrukcja\r\nvar lubieLoL = 10;\r\n\r\n// długa instrukcja zawinięta dla utrzymania jej czytelności\r\nvar rootElementChildren = document\r\n      .GetElementById("mainPageSettginsTab")\r\n      .children[4].children[0]\r\n      .GetAttribute("dataTab")["name"]\r\n      .split("_")[3];\r\n\r\n// a tak wyglądałaby bez zawijania\r\nvar rootElementChildren = document.GetElementById("mainPageSettginsTab").children[4].children[0].GetAttribute("dataTab")["name"].split("_")[3];	82
83	81	easy	Jak napisać instrukcję	Np. utworzenie zmiennej to instrukcja. Przypisanie jej wartości to również instrukcja. \r\n\r\nInstrukcja jest zawsze zakończona znakiem ";".\r\n\r\nKażda linia w poprzednich Twoich zadaniach to była jedna isntrukcja;		83
84	81	easy	Każda instrukcja w nowej linii	Każdą instrukcję piszemy w nowej linii;\r\n\r\nInstrukcje dla lepszej czytelności kodu często rozdziela się pustymi liniami. Łatwiej zrozumieć kod, gdzie: \r\n- instrukcje są pogrupowane w bloki\r\n- każdy blok wykonuje małe zadanie\r\n- bloki od siebie oddzielone są pustymi liniami.	var lubieLodyOrzech = 120;\r\nvar lubieLodyCzeko = 350;\r\nvar lubieLody = lubieLodyOrzech + lubieLodyCzeko;\r\n\r\nvar lubieRozprawki = -6;\r\n\r\nvar woleRozprawki = lubieRozprawki > lubieLody;\r\nreturn "Czy wolę rozprawki od lodów? - " + woleRozprawki + "!";	84
86	85	easy	Co to jest string	Dla komputera tekst to ciąg pojedynczych znaków. \r\nTakim znakiem jest litera, cyfra, spacja, czy znak nowej linii.\r\n\r\n\r\nW programowaniu taki ciąg ma swój typ zmiennej - "string".\r\nDlatego dalej będziemy używać określenia "string", które będzie oznaczało kawałek tekstu.	var hanName = "Han";\r\nvar hanSurname = "Solo";	86
87	85	easy	Łączenie stringów	Stringi można łączyć ze sobą w dłuższe stringi.\r\n\r\nW JavaScript służy do tego operator "+".	var hanName = "Han";\r\nvar hanSurname = "Solo";\r\nvar han = hanName + " " + hanSurname;\r\n\r\n// teraz wartość zmiennej han to:\r\n"Han Solo"	87
89	88	easy	Zamiana stringu na liczbę	Jeżeli string zawiera \r\n\r\n- tylko cyfry\r\n- lub tylko cyfry i jeden znak kropki (separator miejsc dziesiętnych)\r\n- oraz ewentualnie znak "-" lub "+"\r\n\r\nto możemy go zamienić na typ liczbowy stosując składnię "Number(naszTekst)".	var yodasAgeString = "853";\r\nvar yodasAgeInt = Number(yodasAgeString);\r\n\r\nvar yodaTall = Number("114");	89
90	88	easy	Zamiana liczby w string	Można również zmienić liczbę w string. Wykonuje to funkcja JavaScript : "toString()".\r\n\r\nW JavaScript można też po prostu dołączyć liczbę do istniejącego stringu i zostanie ona automatycznie zamieniona na string.	var score = 115;\r\nvar scoreString = score.toString();\r\n\r\nvar scoreText = "Wynik: " + 115;	90
93	92	easy	Co to jest operator	Operator to znak lub para znaków które wydają polecenie wykonania jakiejś operacji na zmiennych.\r\n\r\nTe operacje to np: dodanie dwóch liczb, odejmowanie, łączenie stringów, porównanie wielkości (równe, większe, mniejsze, itd.).\r\n\r\nDla typu logicznego ("true", "false") używa się operatorów logicznych:\r\n- oraz:   "&&"\r\n- lub:   "||"	/*\r\nprzykładowe operatory przypisania wartości\r\n=    przypisanie wartość\r\n+=    dodanie liczby lub dołączenie stringu\r\n*=    pomnożenie przez liczbę\r\n\r\nprzykładowe operatory matematyczne\r\n+    dodawanie\r\n-    odejmowanie\r\n*    mnożenie\r\n/    dzielenie\r\n\r\nprzykładowe operatory porównania\r\n===    równy\r\n!==    nierówny\r\n<    mniejszy\r\n>    większy\r\n<=    mniejszy lub równy\r\n>=    większy lub równy\r\n\r\nprzykładowe operatory logiczne\r\n&&    oraz\r\n||    lub\r\n!    zaprzeczenie (zmienia "true" w "false" i odwrotnie)\r\n\r\n*/\r\n\r\n// przykład zaprzeczenia\r\nvar uwielbiamSzkole = true;\r\nvar jakJest = !uwielbiamSzkole;	93
94	92	easy	Operator przypisania	Znak "=", który widzieliśmy już wczesnie to operator przypisania. Przypisuje on wartość zmiennej.	var bestGame = "Lubię grać";	94
96	95	easy	Operacja z przypisaniem	Często korzysta się z operatorów łączących prostą operację z przypisaniem. \r\n\r\n\r\nTaki operator składa sie zawsze ze znaku operacji (lewy znak) oraz znaku przypisania (prawy znak).\r\n\r\n\r\nDziałanie operatora z przypisaniem:\r\n\r\n1. zmienna po lewej stronie operatora jest poddawana operacj z lewego znaku operatora\r\n\r\n2. a następnie od razu wynik tego działania zostaje zapisany tej samej zmiennej jako jej nowa wartość.	var bestGame = "Lubię grać w: "; \r\nbestGame += "Overwatch";\r\nbestGame += ", Wiedźmin.";\r\n\r\n// teraz bestGame ma wartość: \r\n"Lubię grać w: Overwatch, Wiedźmin."\r\n\r\n// --------------------------------------------------------\r\nvar wynik = 750;\r\nvar nGier = 30;\r\nwynik /= nGier;    // dzielimy wynik przez nGier i od razu zapamiętujemy uzyskaną wartość w zmiennej "wynik"\r\n\r\n// teraz wynik ma wartość:\r\n250	96
80	\N	hard	Co to jest instrukcja, string	CO TO JEST INSTRUKCJA\n=====================================================\n________________________________________________________\n1)\nInstrukcja to jedna linia programu zakończona średnikiem. \r\nChcąc wydać programowi kolejne polecenie piszemy je jako instrukcję.\r\n\r\nJeśli instrukcja jest za długa aby zmieściła się w oknie edytora kodu - można ją zawinąć do kolejnych wierszy. Średnik stawia się na końcu ostatniego wiersza.\n\n\n________________________________________________________\n2)\nNp. utworzenie zmiennej to instrukcja. Przypisanie jej wartości to również instrukcja. \r\n\r\nInstrukcja jest zawsze zakończona znakiem ";".\r\n\r\nKażda linia w poprzednich Twoich zadaniach to była jedna isntrukcja;\n\n\n________________________________________________________\n3)\nKażdą instrukcję piszemy w nowej linii;\r\n\r\nInstrukcje dla lepszej czytelności kodu często rozdziela się pustymi liniami. Łatwiej zrozumieć kod, gdzie: \r\n- instrukcje są pogrupowane w bloki\r\n- każdy blok wykonuje małe zadanie\r\n- bloki od siebie oddzielone są pustymi liniami.\n\n\n\n\nCO TO JEST STRING\n=====================================================\n________________________________________________________\n1)\nDla komputera tekst to ciąg pojedynczych znaków. \r\nTakim znakiem jest litera, cyfra, spacja, czy znak nowej linii.\r\n\r\n\r\nW programowaniu taki ciąg ma swój typ zmiennej - "string".\r\nDlatego dalej będziemy używać określenia "string", które będzie oznaczało kawałek tekstu.\n\n\n________________________________________________________\n2)\nStringi można łączyć ze sobą w dłuższe stringi.\r\n\r\nW JavaScript służy do tego operator "+".\n\n\n\n\nZAMIANA STRINGU NA LICZBĘ I ODWROTNIE.\n=====================================================\n________________________________________________________\n1)\nJeżeli string zawiera \r\n\r\n- tylko cyfry\r\n- lub tylko cyfry i jeden znak kropki (separator miejsc dziesiętnych)\r\n- oraz ewentualnie znak "-" lub "+"\r\n\r\nto możemy go zamienić na typ liczbowy stosując składnię "Number(naszTekst)".\n\n\n________________________________________________________\n2)\nMożna również zmienić liczbę w string. Wykonuje to funkcja JavaScript : "toString()".\r\n\r\nW JavaScript można też po prostu dołączyć liczbę do istniejącego stringu i zostanie ona automatycznie zamieniona na string.	// CO TO JEST INSTRUKCJA\n// =====================================================\n//1) ---------------------------------------------------\n// prosta instrukcja\r\nvar lubieLoL = 10;\r\n\r\n// długa instrukcja zawinięta dla utrzymania jej czytelności\r\nvar rootElementChildren = document\r\n      .GetElementById("mainPageSettginsTab")\r\n      .children[4].children[0]\r\n      .GetAttribute("dataTab")["name"]\r\n      .split("_")[3];\r\n\r\n// a tak wyglądałaby bez zawijania\r\nvar rootElementChildren = document.GetElementById("mainPageSettginsTab").children[4].children[0].GetAttribute("dataTab")["name"].split("_")[3];\n\n\n//3) ---------------------------------------------------\nvar lubieLodyOrzech = 120;\r\nvar lubieLodyCzeko = 350;\r\nvar lubieLody = lubieLodyOrzech + lubieLodyCzeko;\r\n\r\nvar lubieRozprawki = -6;\r\n\r\nvar woleRozprawki = lubieRozprawki > lubieLody;\r\nreturn "Czy wolę rozprawki od lodów? - " + woleRozprawki + "!";\n\n\n\n\n// CO TO JEST STRING\n// =====================================================\n//1) ---------------------------------------------------\nvar hanName = "Han";\r\nvar hanSurname = "Solo";\n\n\n//2) ---------------------------------------------------\nvar hanName = "Han";\r\nvar hanSurname = "Solo";\r\nvar han = hanName + " " + hanSurname;\r\n\r\n// teraz wartość zmiennej han to:\r\n"Han Solo"\n\n\n\n\n// ZAMIANA STRINGU NA LICZBĘ I ODWROTNIE.\n// =====================================================\n//1) ---------------------------------------------------\nvar yodasAgeString = "853";\r\nvar yodasAgeInt = Number(yodasAgeString);\r\n\r\nvar yodaTall = Number("114");\n\n\n//2) ---------------------------------------------------\nvar score = 115;\r\nvar scoreString = score.toString();\r\n\r\nvar scoreText = "Wynik: " + 115;	80
97	95	easy	Inkrementacja, dekrementacja	Często korzysta się z operatorów inkrementacji ji dekrementacji.\r\n\r\n- inkrementacja - powiększenie liczby o 1, operator: "++"\r\n- dekrementacja - zmniejszenie liczby o 1,  operator: "--"\r\n\r\n\r\nInkrementacja i dekrementacja są powszechnie stosowane w pętlach, jak to zobaczymy dalej.	// najczęściej wykorzystuje sie inkrementację w pętli "for" \r\n\r\n\r\n// tu "i" rośnie przy każdym powtórzeniu\r\n\r\nfor(var i = 0; i < 5; i++ ) {\r\n    // tu nastepują instrukcje wewnątrz "for" \r\n    // mogą wykorzystać aktualną wartość "i"\r\n}\r\n\r\n\r\n\r\n// tu "i" maleje przy każdym powtórzeniu\r\n\r\nfor(var i = nReps; i > 0; i-- ) {\r\n    // tu nastepują instrukcje wewnątrz "for" \r\n    // mogą wykorzystać aktualną wartość "i"\r\n}	97
100	99	easy	Co to jest tablica	Tablica w programowaniu to zbiór wielu elementów tego samego typu.\r\n\r\nNp. zbiór wielu liczb lub wielu stringów.	var millHawkCrew = ["Han Solo", "Chewbacca", "R2-D2", "C3PO"];\r\n\r\n\r\nvar money = [0.10, 0.20, 0.50, 1, 2, 5, 10, 50, 100];	100
101	99	easy	Indeks elementu tablicy	Elementy w tablicy są ponumerowane - każdy ma swój numer.\r\n\r\nNumer danego elementu w tablicy to jego "indeks".\r\n\r\nTablice są indeksowane od zera - tzn. pierwszy element ma indeks 0, drugi: 1, trzeci: 2, itd..\r\n\r\nDostęp do elementu tablicy otrzymujemy podając jego indeks w nawiasach kwadratowych po nazwie tablicy.	var badGuys = ["Imperator", "Darth Vader", "Kylo Ren"];\r\n\r\nvar youngestOne = badGuys[2];	101
103	102	easy	Utworzenie tablicy	Tablicę można utworzyć i następnie:\r\n- albo pozostawić pustą,\r\n- albo od razu wpisać do niej wartości,\r\n- albo przypisać wartości jej elementom później.\r\n\r\nTworząc pustą tablicę możemy od razu podać jej rozmiar - w nawiasach kwadratowych.	// utworzyć i pozostawić pustą\r\nvar godGuys = [];\r\n\r\n\r\n// utworzyć i od razu wpisać do niej wartości\r\nvar goodGuys = ["Han Solo", "Luke", "R2D2"];\r\n\r\n\r\n// dodać nowe wartości do już istniejącej \r\nvar jedi = [3];\r\njedi[0] = "Yoda";\r\njedi[1] = "Obi-Wan";\r\njedi[2] = "Jar Jar Binks";	103
104	102	easy	Tworzenie tablicy ze stringu	Można utworzyć tablicę ze stringu, dzieląc go na części oddzielone wskazanym przez nas znakiem.\r\n\r\nSłuży do tego funkcja string.split.	var lodyRazem = "czeko-wani-trusk-orzech";\r\n\r\n// tablica powstanie po pozdzieleniu stringu na części \r\n// które oddziela w nim znak: "-" \r\nvar lody = lodyRazem.split("-");\r\nvar najlepsze = lody[0];	104
105	102	easy	Zapisanie, pobranie elementu	Element tablicy jest po prostu zmienną, tyle, że zamiast unikalnej nazwy jej nazwą jest nazwa tablicy z podanym indeksem.\r\n\r\nElement uchwycony w ten sposób możemy odczytać lub do przypisać mu nową wartość.	var jedi = [3];\r\njedi[0] = "Yoda";\r\njedi[1] = "Obi-Wan";\r\njedi[2] = "Jar Jar Binks";\r\n\r\n// prostujemy okropną pomyłkę\r\njedi[2] = "Qui-Gon";	105
107	106	easy	Co to jest tablica dwuwymiarowa	Tablica dwuwymiarowa to po prostu zwykła tablica, tylko jej elementy również są tablicami.\r\n\r\nZapisujemy ją podając drugi nawias kwadratowy po pierwszym.\r\n\r\nW drugim nawiasie będziemy podawali indeksy tablicy, która jest elementem tablicy nadrzędnej (wskazanym w pierwszym nawiasie).\r\n\r\nDługość każdego z wymiarów tablicy może być różna.	var peopleAndRobots = [2][3];	107
108	106	easy	Tworzenie tablicy dwuwymiarowej	Tablicę dwuwymiarową tworzy się tak jak jednowymiarową pamiętając jedynie o drugim kwadratowym nawiasie.	var peopleAndRobots = [2];\r\npeopleAndRobots[0] = [3];\r\npeopleAndRobots[1] = [3];\r\n\r\npeopleAndRobots[0][0] = "Anakin";\r\npeopleAndRobots[0][1] = "Jabba";\r\npeopleAndRobots[0][2] = "Leia";\r\n\r\npeopleAndRobots[1][0] = "R2D2";\r\npeopleAndRobots[1][1] = "C3PO";\r\npeopleAndRobots[1][2] = "BB-8";	108
109	106	easy	Dostęp do elementu	Dostęp do elementu również działa tak samo z jedyną różnicą, że teraz trzeba podać dwa indeksy:\r\n- indeks pierwszego wymiaru tablicy (w naszym przykładzie to ludzie)\r\n- indeks drugiego wymiaru (to już konkretne osoby).	var peopleAndRobots = [2];\r\npeopleAndRobots[0] = [3];\r\npeopleAndRobots[1] = [3];\r\n\r\npeopleAndRobots[0][1] = "Jabba";\r\n\r\n// znów pomyłka!\r\nvar myFavourite = peopleAndRobots[0][1];\r\n\r\n// poprawiamy\r\npeopleAndRobots[0][1] = "Kylo Ren";\r\n\r\n// hmm, na pewno?...\r\nmyFavourite = peopleAndRobots[0][1];	109
112	111	easy	Instrukcja "if"	Instrukcja "if" sprawdza warunek, który podajemy w nawiasach.\r\n\r\nWarunek to może być: \r\n- zmienna, \r\n- lub instrukcja (bez średnika na końcu), która zwraca wartość "true" lub "false".\r\n- lub kilka zmiennych albo instrukcji połączonych operatorami logicznymi	var iloscCzeko = 3;\r\n\r\n\r\n// warunkiem "if" jest zmienna\r\nvar lubieLodyCzeko = true;\r\nif (lubieLodyCzeko)\r\n    iloscCzeko = iloscCzeko * 0.5;\r\n\r\n\r\n// warunek: instrukcja zwracająca "true" lub "false"\r\nvar liczbaGosci = 3;\r\nif (liczbaGosci > 1) \r\n    iloscCzeko = 0;\r\n\r\n\r\n// warunek: kilka elementów połączonych operatorami logicznymi\r\nif (lubieLodyCzeko && liczbaGosci > 0) \r\n    iloscCzeko = 0;	112
113	111	easy	"if - else"	Instrukcja "if" może zawierać wariant, który się wykona, gdy warunek nie jest spełniony.\r\n\r\nW tym celu dodajemy do drugi element : "else".	var iloscCzeko = 3;\r\nvar iloscPizzy = 2;\r\n\r\n\r\nvar lubieLodyCzeko = true;\r\nif (lubieLodyCzeko)\r\n    iloscCzeko = iloscCzeko * 0.5;\r\nelse\r\n    iloscPizzy -= 1;	113
114	111	easy	"if - else if - else"	Instrukcja "if" może sprawdzać po kolei wiele warunków.\r\n\r\nKolejne warunki sprawdza się dodając element "if else" z jego warunkiem w nawiasach.\r\nElement "if else" trzeba dodać tyle razy ile jest kolejnych warunków do sprawdzenia.\r\n\r\nNa końcu można też dodać element "else", jeżeli jest potrzebny.	var iloscCzeko = 3;\r\nvar iloscPizzy = 2;\r\n\r\nvar czujeGlod = 1;\r\nvar lubieLodyCzeko = false;\r\nvar lubiePizze = false;\r\n\r\nif (lubieLodyCzeko)\r\n    iloscCzeko = iloscCzeko * 0.5;\r\nelse if (lubiePizze)\r\n    iloscPizzy -= 1;\r\nelse\r\n    czujeGlod += 3;	114
116	115	easy	Do czego służy "for"	Pętla "for" służy do wielokrotnego wykonania instrukcji, która znajduje się bezpośrednio za nią.\r\n\r\nMoże to być pojedyncza instrukcja lub blok instrukcji (w nawiasach klamrowych - o bloku instrukcji za chwilę).		116
117	115	easy	Składnia "for"	Pętlę "for" tworzy się :\r\n- pisząc słowo "for"\r\n- za nim nawiasy okrągłe\r\n- w tych nawiasach 3 krótkie instrukcje oddzielone 2 średnikami:\r\n    1. utworzenie iteratora (o nim za chwilę)\r\n    2. warunek przerwania pętli\r\n    3. instrukcja do wykonania po każdym obrocie pętli 	var imperatorMeetings = 20;\r\nvar anakinDarkSide = 0;\r\n\r\n\r\n// ciemna strona mocy Anakina rośnie po każdym \r\n// spotkaniu z Imperatorem\r\nfor (var i = 0; i < imperatorMeetings; i++) \r\n    anakinDarkSide += 25;\r\n\r\n// ZAGADKA:\r\n// Jak silna jest teraz Ciemna Strona w Anakinie?	117
119	118	easy	Wykorzystanie iteratora	"Iterator" to liczba, która jest podnoszona o 1 po zakończeniu każdego obrotu pętli.\r\n\r\nMa 2 funkcje:\r\n- gdy przekroczy podaną wartość - pętla zostaje zakończona,\r\n- wewnątrz pętli może być wykorzystany jako zmienna.	var znajomi =  ["Zdzisław", "Zenon", "Masa", "Rychu"];\r\nvar najnowszyZnajomy;\r\nvar listaGosci = "";\r\n\r\nfor (var i = 0; i < znajomi.length; i++) {\r\n    listaGosci += " - " + znajomi[i];\r\n    najnowszyZnajomy = znajomi[i];\r\n}\r\n\r\n// teraz zmienne mają takie wartości: \r\n//      listaGosci = "Zdzisław - Zenon - Masa - Rychu"\r\n//      najnowszyZnajomy = "Rychu"	119
120	118	easy	"for" wewnątrz innego "for"	Pętle można umieszczać wewnątrz innych pętli.\r\n\r\nW tym celu po prostu jako instrukcję do wykonania wewnątrz "for" piszemy drugi "for".\r\n\r\nW każdym obrocie zewnętrznego "for" (w przykładzie są 2 takie obroty) wykona się cały wewnętrzny "for" (w przykładzie wywołuje swoją instrukcję 4 razy). W efekcie liczba wywołań instrukcji wewnętrznego "for" w przykładzie to iloczyn 2 i 4, czyli 8 razy.	var znajomi =  ["Zdzisław", "Zenon", "Masa", "Rychu"];\r\nvar nieznajomi = ["Złotnik", "Biznesman", "Jubiler", "Bankier"];\r\nvar wszyscy = [znajomi, nieznajomi];\r\n\r\nvar listaGosci = "";\r\n\r\nfor (var i = 0; i < 2; i++) \r\n    for (var j = 0; j < 4; j++)\r\n        listaGosci += ", " + wszyscy[i][j];\r\n\r\n// ZAGADKA:\r\n// Kto jest pierwszy w utworzonym stringu - Masa czy Złotnik?\r\n// Jak zmienić ten podwójny "for", żeby zamienić kolejność tych dwóch\r\n// szacownych, praworządnych obywateli? (nie muszą sąsiadować)	120
123	122	easy	Nawiasy { }	Jeżeli po spełnieniu jakiegoś warunku program ma wykonać jedną instrukcję to można ja podać po prostu w kolejnej linii. (O warunkach dowiesz się już kilka modułów dalej)\r\n\r\n\r\nJeżeli jednak ma on wykonać kilka instrukcji oraz ma ich wszystkich NIE wykonywać, jeśli warunek nie jest spełniony, to trzeba je zamknąć między nawiasami klamrowymi "{ ... }"\r\n\r\nInstrukcje umieszczone pomiędzy nawiasami tworzą "blok instrukcji".\r\n\r\nKod wewnątrz każdego bloku musi mieć większy odstęp od marginesu (być głębiej wcięty) niż kod, który go otacza. Wtedy taki kod jest czytelny.	var marekLubiBulki = false;\r\nvar liczbaBulek = 4;\r\nvar marekZjadl;\r\n\r\n\r\n// Wersja 1. pojedyncza instrukcja zależna od warunku\r\n// ----------------------------------------------------\r\nif (marekLubiBulki === true) \r\n    liczbaBulek = 8;\r\n\r\nmarekZjadl = 4;\r\n\r\n// ile więc bułek zostanie dla mnie?\r\nvar mogeZjesc = liczbaBulek - marekZjadl;\r\n\r\n\r\n\r\n// Wersja 2. blok instrukcji  zależny od warunku\r\n// ----------------------------------------------------\r\n// jeśli Marek nie lubi bułek to dla mnie zostaną 4.\r\nif (marekLubiBulki === true) {\r\n    liczbaBulek = 8;\r\n    marekZjadl = 4;\r\n}\r\n\r\nvar mogeZjesc = liczbaBulek - marekZjadl;	123
27	26	easy	HTML - rusztowanie strony www	Wszystkie pudełka, z których zbudowana jest strona internetowa znajdują się w jednym, głównym. To pudełko nazwywa się "html".\r\n\r\nW nim znajdują się kolejne pudełka, a w nich kolejne - i tak coraz głębiej.\r\n\r\nTo główne pudełko jest dostępne w kodzie JavaScript jako zmienna globalna "document".\r\n\r\n(O tym co to jest zmienna globalna będziemy mówić dalej. Zapamiętaj tylko, że "document" jest zawsze dostępny w kodzie JavaScript - w każdym miejscu można go przywołać).		27
124	122	easy	Zakres widoczności zmiennej	Zmienna utworzona wewnątrz bloku instrukcji będzie widoczna tylko wewnątrz tego bloku.\r\n\r\nCzęsto bloki umieszczane są wewnątrz innych bloków.\r\n\r\nZmienna utworzona wewnątrz bloku zawsze\r\n- jest widoczna w tym bloku \r\n- jest widoczna w blokach zagnieżdżonych w tym bloku,\r\n- NIE jest widoczna na zewnątrz tego bloku.	var marekLubiBulki = true;\r\nvar liczbaBulek = 4;\r\n\r\nif (marekLubiBulki === true) {\r\n    liczbaBulek = 8;\r\n    var marekZjadl = 4; // tworzymy zmienną WEWNĄTRZ bloku\r\n}\r\n\r\n// BŁĄD - zmienna "marekZjadl" nie jest tu widoczna\r\nvar mogeZjesc = liczbaBulek - marekZjadl;   \r\n	124
126	125	easy	Zmienne globalne i lokalne	Zmienna może być dostępna w każdym miejscu kodu, lub tylko wewnątrz funkcji. (co to jest funkcja dowiesz się już za chwilę).\r\n\r\nMówimy wtedy, że zmienna ma "zakres widoczności globalny" lub "zakres widoczności lokalny".\r\n\r\nAby zmienna miała globalny zakres (widoczności) trzeba ją utworzyć poza funkcją.	var globalVar = 5;\r\n\r\nfunction mojaFunkcja() {\r\n    var localVar = 3;\r\n}\r\n\r\nvar total = globalVar + localVar;\r\n// BŁĄD zmienna local nie jest tu widoczna	126
127	125	easy	Zmienne globalne w JavaScript	UWAGA: w JavaScript zmienną można utworzyć podając tylko jej nazwę - bez słowa "var".\r\n\r\nTaka zmienna ma zakres globalny.\r\n\r\nNIGDY nie używaj tej możliwości, ponieważ może prowadzić do nieprzewidzianych efektów twojego kodu - twórz zmienne używając "var".		127
130	129	easy	Co to jest funkcja	Funkcja to fragment kodu, w którym jest jedna lub więcej instrukcji.\r\n\r\nFunkcję tworzy się pisząc \r\n- słowo "function" \r\n- po nim nazwę funkcji\r\n- potem zmknięte nawiasy "()"\r\n- potem nawiasy klamrowe, między którymi umieszcza się instrukcje funkcji	var empireShips = 120;\r\nvar hawkFullyArmed = true;\r\n\r\n\r\n// Millenium Hawk niszczy część floty Imperium\r\nfunction millHawkAttack() {\r\n    if (hawkFullyArmed === true)\r\n        empireShips = empireShips * 0.3;\r\n    else\r\n        empireShips = empireShips * 0.8;\r\n}	130
131	129	easy	Po co są funkcje	1. Funkcję pisze się tylko raz, a można ją wywołać wielokrotnie, w różnych miejscach kodu.\r\n\r\n2. Nazwa funkcji mówi, co ta funkcja robi. Dzięki temu, gdy w kodzie jakiś fragment zastąpi się funkcją to kod staje się bardziej czytelny.		131
133	132	easy	Argumenty funkcji	Do funkcji można przekazać argumenty.\r\n\r\n"Argument" funkcji to zmienna, która zostanie wykorzystana przez instrukcje funkcji.\r\n\r\nArgumenty podaje się w nawiasach za nazwą funkcji.\r\nJeśli argumentów jest wiele - oddziela się je przecinkami.	var empireShips = 120;\r\n\r\n// Millenium Hawk niszczy część floty Imperium\r\nfunction millHawkAttack(hawkFullyArmed, battleLength) {\r\n    if (hawkFullyArmed === true)\r\n        empireShips = empireShips - 5 * battleLength;\r\n    else\r\n        empireShips = empireShips - 2 * battleLength;\r\n}	133
134	132	easy	Wykorzystanie funkcji	Funkcję wywołuje się podając jej nazwę.\r\n\r\nJeśli pobiera ona jakieś argumenty to podaje się je w nawiasach po nazwie, oddzielając przecinkami.	var empireShips = 120;\r\nvar bountyHunterShips = 15;\r\n\r\n// Millenium Hawk niszczy część floty Imperium\r\n// battleLength : czas bitwy w minutach\r\nfunction millHawkAttack(hawkFullyArmed, battleLength) {\r\n    if (hawkFullyArmed === true)\r\n        empireShips = empireShips - 5 * battleLength;\r\n    else\r\n        empireShips = empireShips - 2 * battleLength;\r\n}\r\n\r\nmillHawkAttack(true, 10);\r\n\r\nvar enemyStrength = empireShips + bountyHunterShips;	134
136	135	easy	Funkcja, która nic nie zwraca	Funkcja może wykonać operacje na zmiennych globalnych. Po jej wykonaniu mają one inne wartości niż przedtem.	var zostaloPizzySzt = 2;\r\nvar jestemGlodny = true;\r\nvar czujeSieSwietnie = 8;\r\n\r\n\r\nfunction jemPizze(tyleZjadlem) {\r\n    zostaloPizzySzt -= tyleZjadlem;\r\n    \r\n    if (tyleZjadlem >= 1)\r\n        jestemGlodny = false;\r\n\r\n    // moje samopoczucie spada, jeśli zjadłem za dużo\r\n    var zLakomstwa = tyleZjadlem - 1;\r\n    if (zLakomstwa > 0)\r\n        czujeSieSwietnie -= zLakomstwa * 2;\r\n}	136
137	135	easy	Funkcja, która zwraca dane - "return"	Funkcja może też tworzyć i oddawać jakiś wynik w postaci danych. \r\n\r\nAby funkcja coś zwracała trzeba użyć słowa "return" i po nim podać to, co funkcja zwraca.\r\n\r\nWynik funkcji może mieć dowolny typ: liczba, string, typ logiczny, itd..	var jestemGlodny = true;\r\nvar czujeSieSwietnie = 8;\r\n\r\n\r\nfunction jemPizze(pizzaSzt, tyleZjadlem) {\r\n    if (tyleZjadlem >= 1)\r\n        jestemGlodny = false;\r\n\r\n    // moje samopoczucie spada, jeśli zjadłem za dużo\r\n    var zLakomstwa = tyleZjadlem - 1;\r\n    if (zLakomstwa > 0)\r\n        czujeSieSwietnie -= zLakomstwa * 3;\r\n    \r\n    return PizzaSzt - tyleZjadlem;\r\n}\r\n\r\nvar zostaloPizzySzt = jemPizze(2, 1.5);\r\n	137
140	139	easy	Pobranie referencji do elementu	JavaScript może dodawać, usuwać, zmieniać elementy DOM.\r\n\r\nAby wpływać na istniejący element kod JavaScript musi utworzyć referencję do tego elementu.\r\n\r\n"Referencja" to zmienna, która przechowuje ten element.\r\n\r\nRerefencję do elementu DOM uzyskuje się funkcją GetElementById(), której atrybutem jest "id" tego elementu.\r\n\r\nJest to funkcja elementu "document" - czyli korzenia drzewa DOM (głównego elementu strony, do którego powkładane są wszystkie inne.).\r\n\r\n(Wszystkie pudełka, z których zbudowana jest strona internetowa znajdują się w jednym, głównym. To pudełko nazwywa się "html". W nim znajdują się kolejne pudełka, a w nich kolejne - i tak coraz głębiej. To główne pudełko dla kodu JavaScript jest dostępne jako zmienna globalna "document".)\r\n	var przyciskAkcja = document.GetEllementById("przycAkcja");	140
141	139	easy	Utworzenie innerHTML	Wewnątrz tagu <div> można umieścić:\r\n- tekst,\r\n- inne elementy DOM.\r\n\r\nInne elementy umieszcza się wpisując tam tekst który jest kodem HTML.\r\n\r\nUstawienie tekstu dla <div> wykonuje się w JavaScript przypisując wartość atrybutowi "innerHTML".	<div>Dark Side of The Force Always Prevails...</div>\r\n\r\n<div id="empireFleet"></div>\r\n\r\n<script>\r\n    var divEmpFleet = document.GetElementById("empireFleet"); \r\n    divEmpFleet.innerHTML = 120;\r\n</script>	141
143	142	easy	Tabelka HTML : tagi  <tr>  oraz  <td>	Jeden z elementów HTML to tabelka z wierszami.\r\n\r\nTagi do utworzenia tabelki to:\r\n<table></table> : pudełko z tabelką w środku\r\n<tr></tr>  : jeden wiersz tabelki\r\n<td></td>  : jedna komórka wiersza	<-- tworzymy czarno-białą szachownicę z 4 pól -->\r\n<table>\r\n    <tr>\r\n        <td>białe</td>\r\n        <td>czarne</td>\r\n    </tr>\r\n    <tr>\r\n        <td>czarne</td>\r\n        <td>białe</td>\r\n    </tr>\r\n</table>	143
144	142	easy	Utworzenie tabelki w pętli "for"	Aby wstawić tabelkę do <div> możemy\r\n1. utworzyć string z jej kodem HTML\r\n2. wstawić ten tekst do naszego <div>	// tworzymy zmienną, w której znajdzie się kod HTML tabelki\r\nvar htmlTabelki = "<table>";\r\n\r\n\r\n// w pętli "for" tworzymy wiersze…\r\n// a w nich w wewnętrznej pętli "for" tworzymy komórki wierszy\r\nfor (var row = 0; row < 2; row++) {\r\n\r\n   htmlTabelki += "<tr>";\r\n\r\n    for (var column = 0; column < 2; column++)\r\n        htmlTabelk += "<td></td>";\r\n\r\n    htmlTabelki += "</tr>";\r\n}\r\n\r\n\r\n// wstawiamy gotowy kod HTML do <div>\r\nvar divSzachy = document.GetElementById("szachy");\r\ndivSzachy.innerHTML = kodTabelki;	144
147	146	easy	Pobranie wartości input	Element "input" typu "text" pozwala użytkownikowi wpisać tekst.\r\n\r\nMożna tam wpisać np. liczbę.\r\n\r\nTaki tekst można potem pobrać w JavaScript odczytując atrybut "value" tego elementu "input".	<input id="mineFieldSize" type="text">\r\n\r\n<script>\r\n    var textSize = document.GetElementById("mineFieldSize");\r\n    var size = textSize.value;\r\n</script>	147
148	146	easy	Utworzenie tablicy danych w pętli "for"	Możemy przechowywać dane wszystkich pól naszej tabelki w osobnej tablicy.\r\nTo daje nam wygodną możliwość manipulowania tymi danymi.\r\n\r\nTę tablicę możemy wypełnić danymi w takiej samej podwójnej pętli.\r\nW grze "Saper" pola mają wartość "1" lub "0" = "mina" lub "czysto".\r\n\r\n\r\n("Math.random() " tworzy liczbę losową pomiędzy 0 a 1.\r\nZAGADKA: jakich pól będzie więcej w naszej tablicy - zaminowanych czy czystych?)	// tworzymy tablicę danych\r\nvar board = [2][2];\r\n\r\n\r\n// w podówjnej pętli "for" wpisujemy dane tablicy\r\nfor (var row = 0; row < 2; row++)\r\n    for (var column = 0; column < 2; column++)\r\n        if (Math.random() < 0.2)\r\n            board[row][column] = 1;\r\n        else\r\n            board[row][column] = 0;\r\n	148
150	149	easy	Klasa elementu DOM	Jednym z atrybutów dlementu DOM jest tablica jego klas CSS.\r\n\r\nTen trybut ma nazwę : "classList".\r\n\r\n"Klasa CSS" to zbiór ustawień wyglądu elementu posiadający swoją nazwę.\r\n\r\nElement może mieć wiele klas CSS w swoim "classList".		150
151	149	easy	Dodanie klasy do elementu	Klasy CSS można dodawać do elemenu funkcją JavaScript  add().\r\n\r\nPrzykład pokazuje również drugi mechanizm - w JavaScript można wywoływać kolejne polecenia oddzielając je tylko kropkami. Np. tutaj w jednej linii wykonuje się:\r\n  1. pobranie referencji do elementu \r\n  2. pobranie atrybutu "classList" tego elementu\r\n  3. dodanie do "classList" klasy "loaded"	<div id="singleField">\r\n\r\n<script>\r\n    document.GetElementById("singleField").classList.add("loaded");\r\n</script>	151
154	153	easy	Co to jest zdarzenie (event)	"Event" w JavaScript reprezentuje pojedyncze zdarzenie w przeglądarce. \r\n\r\nTakim zdarzeniem może być:\r\n- kliknięcie elementu lewym przyciskiem myszy,\r\n- kliknięcie elementu prawym przyciskiem myszy,\r\n- zakończenie ładowania strony przez przeglądarkę,\r\n- i wiele innych.		154
155	153	easy	Event - jego atrybuty	Event w istocie jest obiektem, który posiada swoje atrybuty. \r\n\r\nWśród tych atrybutów znajdują się:\r\n- obiekt, który ten event wywołał (np okreslony przycisk),\r\n- obiekty, które mają zareagować na wywołanie tego eventu (jedna lub wiele funkcji),\r\n- sposób wywołania - np czy to lewy czy prawy przycisk myszy.\r\n\r\nWywołanie eventu powoduje wywołanie wszystkich funkcji, które mają na niego zareagować. Otrzymują go i mogą odczytać jego atrybuty.		155
157	156	easy	Dodanie "click" do przycisku	Event "click" to event wywoływany w chwilli kliknięcia danego elementu lewym przyciskiem myszy.\r\n\r\nDopóki nie przypiszemy mu żadnej funkcji to kliknięcie nie spowoduje żadnej reakcji.\r\n\r\nReakcja pojawi się po kliknięciu gdy przypiszemy mu funkcję JavaScript.	<-- ten przycisk nic nie robi -->\r\n<input type="button" value="Feeble attack">\r\n\r\n\r\n<-- ten przycisk otwiera piekło dla Imperium -->\r\n<input type="button" value="FireAndFury"  click="millHawkAttack()">\r\n	157
158	156	easy	Dodanie "click" do <div>	Do elementu, który nie jest przyciskiem można też dodać akcję na event "click".\r\n\r\nDo tego celu służy funkcja "AddEventListener("click", ...)"	<-- Na razie nikt nie bierze Jar Jara pod uwagę -->\r\n<div id="JarJar">Jar Jar is never what you expect.</div>\r\n\r\n<script>\r\n    // teraz nabiorą do niego respektu!\r\n    var butJarJar = document.GetElementById("JarJar");\r\n    butJarJar.addEventListener("click", blowTheGenerator);\r\n</script>	158
160	159	easy	Pobranie eventu w wywołanej funkcji	Funkcja wywoływana przez event może odczytać jego atrybuty.\r\n\r\nW tym celu należy umieścić referencję do tego eventu jako jej pierwszy argument.\r\nWystarczy podać tam jakąkolwiek nazwę, dla tego eventu - np. "e".	function blowTheGenerator(e) {\r\n    \r\n}	160
161	159	easy	Pobranie elementu wywołującego event	Otrzymawszy referencję do eventu można odczytać jego atrybuty i wykorzystac je.\r\n\r\nŹródło eventu znajduje się w jego atrybucie "target". \r\nTym źródłem jest po prostu element DOM, który go wywołał - div, input, itd. \r\n\r\nMając ten element można odczytać jego atrybuty. \r\nNp. można odczytać jego "id".	function blowTheGenerator(e) {\r\n    var przycisk = e.target;\r\n    var whoDidThis = przycisk.id;\r\n\r\n    if (whoDidThis === "JarJar")\r\n        return "Oh no! Not HIM again! Aaaaaaaah…!";\r\n    else\r\n        return "HA! We have been expecting you…";\r\n}	161
28	26	easy	Drzewo DOM	Podełka powkładane w pudełka można inaczej opisać jako drzewo:\r\n- jego korzeń to "html"\r\n- korzeń rozgałezia się na "head" i "body" (czyli zawiera je w sobie) \r\n- "body" rozgałęzia się na wiele elementów "div" (czyli zawiera je w sobie)\r\n- te rozgałęziają się na kolejne, coraz mniejsze, coraz głębiej w strukturze drzewa.\r\n\r\nTo drzewo nazywa się "DOM" - Document Object Model.\r\n\r\nElementy drzewa DOM to obiekty, które można odczytywać i zmieniać używając JavaScript.		28
30	29	easy	Co to jest znacznik html (tag)	Wszystkie pudełka buduje się tak samo - pisząc znaczniki html.\r\n\r\n"Znacznik html" to po angielsku "tag". Dalej będziemy używali słowa "tag".\r\n\r\nTag jest to słowo, które odczytane przez przeglądarkę powoduje, że buduje ona taki element jaki przypisany jest to tego tagu. \r\n\r\nPrzegladarka sama w sobie zawiera kod budujący każdy z możliwych tagów, dlatego programista pisze tylko sam tag i nie musi się martwić jak ma on zostać utworzony.		30
163	162	easy	Event "contextmenu"	Event "contextmenu" to po prostu event wywoływany prawym przyciskiem myszy.\r\n\r\nDodaje się go do elementu tak samo jak inne.	<-- Teraz Jar Jar już powinien uważać  -->\r\n<div id="JarJar">Jar Jar is never what you expect.</div>\r\n\r\n<script>\r\n    // .. musimy mu dać nową umiejętność\r\n    var butJarJar = document.GetElementById("JarJar");\r\n    butJarJar.addEventListener("contextemu", teleportElsewhere);\r\n</script>	163
164	162	easy	Domyślna akcja "contextmenu"	Jednak przeglądarka ma na stałe ustawioną domyślną akcję na prawy przycisk myszy. Jest to otwarcie menu kontekstowego.\r\n\r\nJeśli chcemy tę akcję wyłączyć należy użyć funkcji "preventDefault".	function blowTheGenerator(e) {\r\n    // wyłączamy domyślną akcję prawego przycisku myszy\r\n    e.preventDefault();    \r\n\r\n    // teraz menu kontekstowe już się nie otworzy\r\n    // możemy wykonywać naszą akcję dla prawdgo przycisku\r\n}	164
159	152	medium	Wykorzystanie eventu	________________________________________________________\n1)\nFunkcja wywoływana przez event może odczytać jego atrybuty.\r\n\r\nW tym celu należy umieścić referencję do tego eventu jako jej pierwszy argument.\r\nWystarczy podać tam jakąkolwiek nazwę, dla tego eventu - np. "e".\n\n\n________________________________________________________\n2)\nOtrzymawszy referencję do eventu można odczytać jego atrybuty i wykorzystac je.\r\n\r\nŹródło eventu znajduje się w jego atrybucie "target". \r\nTym źródłem jest po prostu element DOM, który go wywołał - div, input, itd. \r\n\r\nMając ten element można odczytać jego atrybuty. \r\nNp. można odczytać jego "id".	//1) ---------------------------------------------------\nfunction blowTheGenerator(e) {\r\n    \r\n}\n\n\n//2) ---------------------------------------------------\nfunction blowTheGenerator(e) {\r\n    var przycisk = e.target;\r\n    var whoDidThis = przycisk.id;\r\n\r\n    if (whoDidThis === "JarJar")\r\n        return "Oh no! Not HIM again! Aaaaaaaah…!";\r\n    else\r\n        return "HA! We have been expecting you…";\r\n}	159
29	25	medium	Cegiełki DOM	________________________________________________________\n1)\nWszystkie pudełka buduje się tak samo - pisząc znaczniki html.\r\n\r\n"Znacznik html" to po angielsku "tag". Dalej będziemy używali słowa "tag".\r\n\r\nTag jest to słowo, które odczytane przez przeglądarkę powoduje, że buduje ona taki element jaki przypisany jest to tego tagu. \r\n\r\nPrzegladarka sama w sobie zawiera kod budujący każdy z możliwych tagów, dlatego programista pisze tylko sam tag i nie musi się martwić jak ma on zostać utworzony.\n\n\n________________________________________________________\n2)\nKażdy element DOM powstaje poprzez napisanie dwóch tagów :\r\n  1. tag początkowy - czyli nazwa pomiędzy znakami "<"   ">"\r\n  2. tag końcowy - czyli nazwa pomiędzy znakami "</"   ">"\r\n\r\nPrzykładowe tagi to:\r\n  <body>\r\n  <div>\r\n  <input>\r\n\r\nNiektóre elementy tworzy się bez tagu końcowego (np <input>).\n\n\n________________________________________________________\n3)\nWstawienie jednego elementu DOM do innego - czyli wstawienie pudełka do środka innnego pudełka - polega na:\r\n- wpisaniu tagów początku i końca wewnętrznego elementu...\r\n- ...pomiędzy tagi początku i końca zewnętrznego elementu.	//2) ---------------------------------------------------\n<body>\r\n    <div>\r\n        <input type="button" value="Ok.">\r\n        <div>Tekst na mojej stronie</div>\r\n    </div>\r\n</body>\n\n\n//3) ---------------------------------------------------\n<div>\r\n    <div>Tekst na mojej stronie</div>\r\n</div>	29
37	33	medium	Tagi <div> oraz <input>	________________________________________________________\n1)\nTag <div> jest najczęściej stosowany.\r\n\r\nTworzy on pudełko, do którego wkłada się kolejne div-y lub inne elementy DOM.\n\n\n________________________________________________________\n2)\nTag <input> służy do wpisywania danych i wywoływania akcji na stronie.\r\n\r\nWystępuje w kilku typach. Dwa z nich to:\r\n- type="text"   : tworzy pole tekstowe, w które można wpisać liczbę lub tekst\r\n- type="button"  : tworzy przycisk do którego można przypisać funkcję JavaScript\n\n\n________________________________________________________\n3)\nTag <script> tworzy miejsce, w którym umieszcza się kod JavaScript.\r\n\r\nMożna go umieścić w "body".\r\n\r\nWewnątrz pisze się kod JavaScript, który ma działać na tej stronie internetowej.\r\n\r\n(Jeśli kod JavaScript jest dłuższy, to umieszcza się go w osobnych plikach z rozszerzeniem .js. Te pliki importuje się do HTML umieszczając ich adresy w elemencie "script" umieszczonym w "head". Ale w tym kursie my umieścimy Twój kod w elemencie "script" tak, żeby działał.)	//1) ---------------------------------------------------\n<div>\r\n\r\n</div>\n\n\n//2) ---------------------------------------------------\n<input type="text" id="textFigthLength">\r\n\r\n<input type="button" value="Atakuj"  click="millHawkAttack()">\r\n\n\n\n//3) ---------------------------------------------------\n<script>\r\n    function countTheEnemy() {\r\n        var empireFleet = 210;\r\n        var bountyHunters = 15;\r\n        return empireFleet + bountyHunters;\r\n    }\r\n</script>	37
41	33	medium	Atrybut elementu DOM	________________________________________________________\n1)\n"Atrybut" elementu DOM to jakaś jego właściwość, którą może ustawić i odczytać programista.\r\n\r\nAtrybuty ustawia się wewnątrz tagu - za znakiem "<" oraz nazwą tagu, a przed znakiem ">".\r\n\r\nOddziela się je od nazwy tagu oraz od siebie nawzajem pojedynczą spacją.\n\n\n________________________________________________________\n2)\nAtrybut "id" elementu to jego identyfikator.\r\n\r\nMusi on być unikalny - jedyny taki w całym drzewie DOM.\r\n\r\nElementy drzewa DOM to obiekty - osobne fragmenty strony. Ich atrybuty można odczytywać i zmieniać. Atrybut "id" pozwala odnaleźć dany element w drzewie DOM. Dlatego "id" musi być unikalne.\n\n\n________________________________________________________\n3)\nElement <input> wymaga kilku atrybutów aby działał:\r\n- atrybut "type": "button" utworzy przycisk, "text" utworzy pole tekstowe\r\n- atrybut "value": ustawia tekst wyświetlany w tym elemencie\r\n- atrybut "click": ustawia funkcję JavaScript, którą uruchomi kliknięcie	//1) ---------------------------------------------------\n<div id="planAkcji">\r\n    ….\r\n   <input type="button" value="Atakuj"  click="millHawkAttack()">\r\n    ….\r\n</div>\r\n\n\n\n//2) ---------------------------------------------------\n<div id="divPrzyciskiAkcja">\r\n    ….\r\n   <input id="przycAtak">\r\n   <input id="przycHipernaped">\r\n    ….\r\n</div>\r\n\n\n\n//3) ---------------------------------------------------\n   <input id="przycAtak" type="button" value="Atakuj">\r\n	41
46	45	medium	Do czego służy JavaScript	________________________________________________________\n1)\nJavaScript to język, w którym pisze się procedury, które coś robią i coś zmieniają.\r\n\r\nPrzykłady:\r\n- coś obliczają i wyświetlają wynik,\r\n- zmieniają wygląd strony,\r\n- pobierają dane z Internetu,\r\n- itd.\n\n\n________________________________________________________\n2)\nFunkcje JavaScript wywoływane są przez klikanie elementów DOM.\r\n\r\nNp. przycisk "przycAtak" tu wywołuje funkcję JavaScript "millHawkAttack()".\r\n\r\nPrzypisanie funkcji JavaScript do elementu "input" typu "button" dokonuje się przez przypisanie tej funkcji do atrybutu "click" tego przycisku. \r\n\r\n(O funkcjach JavaScript będziemy mówili dalej.)	//2) ---------------------------------------------------\n   <input id="przycAtak" type="button" value="Atakuj"  click="millHawkAttack()">\r\n	46
49	45	medium	Komentarze	________________________________________________________\n1)\n"Komentarz" to linia lub kilka linii w kodzie programu, które są niewidoczne dla komputera.\r\n\r\nAby były niewidoczne poprzedza się je podwójnym slash-em.\r\n\r\nBez "//" na początku komentarz powoduje błąd kompilacji, ponieważ jest niezrozumiały dla komputera.\n\n\n________________________________________________________\n2)\nKomentarz wyjaśnia krótko i jasno fragment kodu, który znajduje się za nim.\r\n\r\nKomentarze są bardzo ważne - pozwalają dużo szybciej zrozumieć kod. \r\n\r\nKażdy programista wie, że nawet jego własny kod po krótkim czasie wymaga wysiłku aby go zrozumieć. Ten wysiłek niepotrzebnie pochłania czas. \r\n\r\nDlatego każdy dobry programista pisze dużo komentarzy, bo to trwa krócej i jest łatwiejsze niż analiza kodu. Źli programiści nie piszą. Do ciebie należy wybór kim będziesz ;)	//1) ---------------------------------------------------\n// Ta linia zaczyna się od "//"  -  to jest właśnie "komentarz"\r\n\r\nta linia nie zaczyna się od "//" i nie jest kodem - jak widzisz edytor wskazuje błąd\n\n\n//2) ---------------------------------------------------\nvar boardSize = 5;\r\nvar boardTable = [boardSize][boardSize];\r\nvar youAreKilled = false;\r\n\r\n\r\n// -------------------------------------------------------\r\n// fragment kodu bez komentarza - o co w nim chodzi?\r\n\r\nfor (var r = 0; r < boardSize; r++)\r\n    for (var c = 0; c < boardSize; c++)\r\n        if (boardTable[r][c] == 1) {\r\n            BAM(r, c);\r\n            youAreKilled = true;\r\n        }\r\n\r\n\r\n\r\n// -------------------------------------------------------\r\n// ten sam kod z komentarzem\r\n\r\n// Zdetonowanie wszystkich min na tablicy i zabicie sapera\r\nfor (var r = 0; r < boardSize; r++)\r\n    for (var c = 0; c < boardSize; c++)\r\n        if (boardTable[r][c] == 1) {\r\n            BAM(r, c);\r\n            youAreKilled = true;\r\n        }	49
53	52	medium	Czytelność dla człowieka	________________________________________________________\n1)\nKażdy program to od kilkudziesięciu linii do kilkudziesięciu tysięcy linii kodu.\r\n\r\nBudowanie i rozwijanie programu trwa wiele miesięcy lub lat.\r\n\r\nAby zrozumieć nawet własny kod po paru tygodniach od napisania każdy programista musi go analizować na nowo. Zrozumienie cudzego kodu jest jeszcze trudniejsze.\r\n\r\nDlatego jednym z kryteriów dobrego kodu jest jego czytelność - czyli jak łatwo jest zrozumieć co on robi.\n\n\n________________________________________________________\n2)\nPracując nad programem zawsze wracasz do fragmentów napisanych wcześniej. \r\n\r\nAby poprawiać i korzystać z tego co już stworzyłeś musisz rozumieć jak to działa.\n\n\n________________________________________________________\n3)\nNiemal każdy program jest tworzony przez co najmniej kilku programistów.\r\n\r\nKażdy taki programista korzysta i zmienia fragmenty napisane przez kolegów.\r\n\r\nZrozumienie cudzego kodu jest trudniejsze niż zrozumienie własnego.\n\n\n________________________________________________________\n4)\nO czytelności kodu decyduje kilka elementów.\r\n\r\n- nazwy zmiennych i funkcji,\r\n- komentarze,\r\n- puste linie dzielące kod na wyraźnie widoczne bloki.\n\n\n________________________________________________________\n5)\nDobra nazwa:\r\n- jasno mówi co przechowuje dana zmienna lub co robi dana funkcja\r\n- jest możliwie krótka (optymalnie od 1 do 3 wyrazów)\r\n- wyraźnie, na pierwszy rzut oka różni się od innych 	//5) ---------------------------------------------------\n// nazwy zmiennych, które nic nie mówią\r\nvar etta = 10;\r\nvar ivc = true;\r\n\r\n// nazwy zmiennych, które są zrozumiałe\r\nvar enemyArrivalTime = 10;\r\nvar isVaderComing = true;\r\n\r\n// zmienne mniej i zmienne więcej mówiące\r\nvar enemyArrival = 10;\r\nvar enemyArrivalTime = 10;\r\nvar enemyArrivalTimeSec = 10;\r\n\r\n// nazwa funkcji zbyt długa i nazwa dobra\r\nfunction generateEnemyBaseSpatialDistributionModel() {}\r\nfunction makeEnemyMap() {}\r\n	53
59	52	medium	Jak pisać komentarze	________________________________________________________\n1)\nProgramista najłatwiej i najszybciej pisze kod, gdy przedtem zaplanował wszystkie jego części.\r\n\r\nDlatego bardzo dobrą praktyką jest :\r\n- NAJPIERW napisać serię komentarzy - w których znajdą się wszystkie części kodu.\r\n- POTEM pod komentarzami napisać kod, który robi to co w komentarzu.\r\n\r\nZazwyczaj taki plan obejmuje kod jednej funkcji (funkcje to fragmenty kodu wykonujące jakąś określoną czynność- dowiesz o nich więcej w dalszej części).\r\n\r\nBardzo często dodaje się również komentarze po napisaniu kodu, gdy jasne się staje że dany fragment tego wymaga dla szybszego zrozumienia.\n\n\n________________________________________________________\n2)\nNa 1 ekranie kodu powinno być kilka komentarzy.\r\n\r\nIch liczba jest większa gdy kod jest trudniejszy.\r\n\r\nIch liczba jest mniejsza gdy kod jest oczywisty, a nazwy zmiennych i funkcji są czytelne - wiadomo co w nich jest.\n\n\n________________________________________________________\n3)\nWiększość komentarzy to maksymalnie 1 linia tekstu.\r\n\r\nNiektóre komentarze mogą mieć wiele linii. Pisz takie wtedy, gdy czytającemu potrzebne jest ogólne wyjaśnienie jak to działa ta część programu.	//1) ---------------------------------------------------\n// Przykład komentarzy poprzedzających napisanie kodu\r\n// -------------------------------------------------------------------\r\n\r\n\r\n// utwórz mapę bazy sił Rebelii\r\n\r\n    // utwórz tabelkę html mapy\r\n\r\n    // utwórz tablicę oddziałów Rebelii\r\n\r\n    // ustaw liczebność oddziałów na mapie\r\n\r\n\r\n// oblicz punkt uderzenia z Gwiazdy Śmierci\r\n\r\n    // sprawdź stopień naładowania generatorów\r\n\r\n    // zsumuj poziom frustracji wszystkich Sithów i ich generałów\r\n\r\n    // oblicz trajektorię uderzenia w zależności od sumy energii\r\n\r\n\r\n// usuń rebeliantów z kwadratu, który ulegnie zniszczeniu\n\n\n//3) ---------------------------------------------------\n// (komentarz krótki: ) Kylo Ren niszczy 5 z 12 X-Wingów\r\n\r\n\r\n// (Komentarz długi: ) \r\n// Optymalizacjia reakcji Rebleiantów odbywa się w 3 krokach:\r\n//    1. utworzenie aktualnej mapy bazy sił Rebelii\r\n//    2. obliczenie punktu uderzenia z Gwiazdy Śmierci\r\n//    3. usunięcie sił z kwadratu, który ulegnie zniszczeniu\r\n//\r\n// UWAGA: poziom frustracji Sithów zmienia się losowo.	59
26	25	medium	HTML - rusztowanie strony www	________________________________________________________\n1)\nWszystkie pudełka, z których zbudowana jest strona internetowa znajdują się w jednym, głównym. To pudełko nazwywa się "html".\r\n\r\nW nim znajdują się kolejne pudełka, a w nich kolejne - i tak coraz głębiej.\r\n\r\nTo główne pudełko jest dostępne w kodzie JavaScript jako zmienna globalna "document".\r\n\r\n(O tym co to jest zmienna globalna będziemy mówić dalej. Zapamiętaj tylko, że "document" jest zawsze dostępny w kodzie JavaScript - w każdym miejscu można go przywołać).\n\n\n________________________________________________________\n2)\nPodełka powkładane w pudełka można inaczej opisać jako drzewo:\r\n- jego korzeń to "html"\r\n- korzeń rozgałezia się na "head" i "body" (czyli zawiera je w sobie) \r\n- "body" rozgałęzia się na wiele elementów "div" (czyli zawiera je w sobie)\r\n- te rozgałęziają się na kolejne, coraz mniejsze, coraz głębiej w strukturze drzewa.\r\n\r\nTo drzewo nazywa się "DOM" - Document Object Model.\r\n\r\nElementy drzewa DOM to obiekty, które można odczytywać i zmieniać używając JavaScript.		26
63	52	medium	Puste linie	________________________________________________________\n1)\nPuste linie oddzielają od siebie fragmenty kodu.\r\n\r\nWizualnie ułatwiają analizę jego fragmentów - mózg szybciej rozumie dobrze poukładane grupy instrukcji.\r\n\r\nMożesz je zaobserwować we wszytskich przykładach tego kursu.\n\n\n________________________________________________________\n2)\nZawsze wstawiaj min 1 pustą linię przed komentarzem.\r\n\r\nGrupuj instrukcje składające się na jeden mały efekt. Zawsze oddzielaj takie grupy pojedynczą pustą linią.\r\n\r\nOddzielaj od siebie dwiema pustymi liniami dłuższe, logicznie powiązane fragmenty kodu, składające się z wielu grup.		63
67	66	medium	Co to jest zmienna	________________________________________________________\n1)\nZmienna to miejsce w pamięci komputera, w którym zapisujemy jakąś wartość.\r\n\r\nMoże to być liczba, albo tekst albo inne rodzaje danych.\n\n\n________________________________________________________\n2)\nAby używac zmiennej nadajemy jej nazwę. \r\n\r\nNazwa zmiennej powinna być przede wszystkim jednoznaczna - jasno mówić co przechowuje.\r\n\r\nRównoczesnie powinna być możliwie krótka  - to ułatwia rozumienie kodu.\r\n\r\n\r\nNazwa zmiennej często składa się z kilku słów.\r\n\r\nW JavaScript przyjęto styl "camelback" - tzn.: \r\n- nazwy zmiennych i funkcji piszemy małymi literami,\r\n- pierwsze słowo zaczynamy z małej, \r\n- każde kolejne słowo zaczynamy z dużej litery.	//2) ---------------------------------------------------\nvar liczbaLekcji;\r\n\r\nvar i;\r\n\r\nvar maxLength;\r\n\r\nvar wartMojegoPortfelaPrzedWakac;	67
31	29	easy	Znacznik początku i końca elementu	Każdy element DOM powstaje poprzez napisanie dwóch tagów :\r\n  1. tag początkowy - czyli nazwa pomiędzy znakami "<"   ">"\r\n  2. tag końcowy - czyli nazwa pomiędzy znakami "</"   ">"\r\n\r\nPrzykładowe tagi to:\r\n  <body>\r\n  <div>\r\n  <input>\r\n\r\nNiektóre elementy tworzy się bez tagu końcowego (np <input>).	<body>\r\n    <div>\r\n        <input type="button" value="Ok.">\r\n        <div>Tekst na mojej stronie</div>\r\n    </div>\r\n</body>	31
74	73	medium	Typy zmiennych	________________________________________________________\n1)\nUżywa się wielu typów zmiennych. Główny podział to typy proste i złożone.\r\n\r\nZmienne proste zawierają jeden element - np.: \r\n- liczbę,\r\n- tekst (string),\r\n- wartość logiczną : prawda ("true") lub fałsz ("false").\n\n\n________________________________________________________\n2)\nIstnieją wiele złożonych typów zmiennych .\r\n\r\nTyp złożony przechowuje wiele pojedynczych informacji - np wiele liczb, wiele tekstów (stringów).\r\n\r\nW czasie tego kursu będziemy wykorzystywali jeden z nich - tablice.\r\n(Nauczymy się używać tablic w dalszej części kursu.)	//1) ---------------------------------------------------\nvar nPartsStarWars = 7;\r\n\r\nvar newVader = "Kylo Ren";\r\n\r\nvar deathStarPower = 8000001562.75;\r\n\r\nvar hanLikesLea = true;\n\n\n//2) ---------------------------------------------------\n// tablica\r\nvar millHawkCrew = ["Han Solo", "Chewbacca", "R2-D2", "C3PO"];\r\n\r\n// obiekt\r\nvar badGuys = {\r\n    cleverBoss: "Imperator", \r\n    complicatedOne: "Darth Vader", \r\n    nMaxSiths: 3\r\n};	74
77	73	medium	Przypisanie wartości zmiennej	________________________________________________________\n1)\nWartośc można nadać zmiennej od razu przy jej tworzeniu. \r\n\r\nW takim przypadku po nazwie zmiennej piszemy znak "=" a dalej wartość i kończymy znakiem ";".\n\n\n________________________________________________________\n2)\nMożna też zmienną utworzyć na razie nie nadając jej żadnej wartości.\r\n\r\nWartość zostaje nadana później w trakcie wykonywania dalszych instrukcji programu.	//1) ---------------------------------------------------\nvar maxNPaczkow = 21;\n\n\n//2) ---------------------------------------------------\nvar maxNPaczkow;\r\nmaxNPaczkow = 21;	77
81	80	medium	Co to jest instrukcja	________________________________________________________\n1)\nInstrukcja to jedna linia programu zakończona średnikiem. \r\nChcąc wydać programowi kolejne polecenie piszemy je jako instrukcję.\r\n\r\nJeśli instrukcja jest za długa aby zmieściła się w oknie edytora kodu - można ją zawinąć do kolejnych wierszy. Średnik stawia się na końcu ostatniego wiersza.\n\n\n________________________________________________________\n2)\nNp. utworzenie zmiennej to instrukcja. Przypisanie jej wartości to również instrukcja. \r\n\r\nInstrukcja jest zawsze zakończona znakiem ";".\r\n\r\nKażda linia w poprzednich Twoich zadaniach to była jedna isntrukcja;\n\n\n________________________________________________________\n3)\nKażdą instrukcję piszemy w nowej linii;\r\n\r\nInstrukcje dla lepszej czytelności kodu często rozdziela się pustymi liniami. Łatwiej zrozumieć kod, gdzie: \r\n- instrukcje są pogrupowane w bloki\r\n- każdy blok wykonuje małe zadanie\r\n- bloki od siebie oddzielone są pustymi liniami.	//1) ---------------------------------------------------\n// prosta instrukcja\r\nvar lubieLoL = 10;\r\n\r\n// długa instrukcja zawinięta dla utrzymania jej czytelności\r\nvar rootElementChildren = document\r\n      .GetElementById("mainPageSettginsTab")\r\n      .children[4].children[0]\r\n      .GetAttribute("dataTab")["name"]\r\n      .split("_")[3];\r\n\r\n// a tak wyglądałaby bez zawijania\r\nvar rootElementChildren = document.GetElementById("mainPageSettginsTab").children[4].children[0].GetAttribute("dataTab")["name"].split("_")[3];\n\n\n//3) ---------------------------------------------------\nvar lubieLodyOrzech = 120;\r\nvar lubieLodyCzeko = 350;\r\nvar lubieLody = lubieLodyOrzech + lubieLodyCzeko;\r\n\r\nvar lubieRozprawki = -6;\r\n\r\nvar woleRozprawki = lubieRozprawki > lubieLody;\r\nreturn "Czy wolę rozprawki od lodów? - " + woleRozprawki + "!";	81
85	80	medium	Co to jest string	________________________________________________________\n1)\nDla komputera tekst to ciąg pojedynczych znaków. \r\nTakim znakiem jest litera, cyfra, spacja, czy znak nowej linii.\r\n\r\n\r\nW programowaniu taki ciąg ma swój typ zmiennej - "string".\r\nDlatego dalej będziemy używać określenia "string", które będzie oznaczało kawałek tekstu.\n\n\n________________________________________________________\n2)\nStringi można łączyć ze sobą w dłuższe stringi.\r\n\r\nW JavaScript służy do tego operator "+".	//1) ---------------------------------------------------\nvar hanName = "Han";\r\nvar hanSurname = "Solo";\n\n\n//2) ---------------------------------------------------\nvar hanName = "Han";\r\nvar hanSurname = "Solo";\r\nvar han = hanName + " " + hanSurname;\r\n\r\n// teraz wartość zmiennej han to:\r\n"Han Solo"	85
88	80	medium	Zamiana stringu na liczbę i odwrotnie.	________________________________________________________\n1)\nJeżeli string zawiera \r\n\r\n- tylko cyfry\r\n- lub tylko cyfry i jeden znak kropki (separator miejsc dziesiętnych)\r\n- oraz ewentualnie znak "-" lub "+"\r\n\r\nto możemy go zamienić na typ liczbowy stosując składnię "Number(naszTekst)".\n\n\n________________________________________________________\n2)\nMożna również zmienić liczbę w string. Wykonuje to funkcja JavaScript : "toString()".\r\n\r\nW JavaScript można też po prostu dołączyć liczbę do istniejącego stringu i zostanie ona automatycznie zamieniona na string.	//1) ---------------------------------------------------\nvar yodasAgeString = "853";\r\nvar yodasAgeInt = Number(yodasAgeString);\r\n\r\nvar yodaTall = Number("114");\n\n\n//2) ---------------------------------------------------\nvar score = 115;\r\nvar scoreString = score.toString();\r\n\r\nvar scoreText = "Wynik: " + 115;	88
92	91	medium	Co to jest operator	________________________________________________________\n1)\nOperator to znak lub para znaków które wydają polecenie wykonania jakiejś operacji na zmiennych.\r\n\r\nTe operacje to np: dodanie dwóch liczb, odejmowanie, łączenie stringów, porównanie wielkości (równe, większe, mniejsze, itd.).\r\n\r\nDla typu logicznego ("true", "false") używa się operatorów logicznych:\r\n- oraz:   "&&"\r\n- lub:   "||"\n\n\n________________________________________________________\n2)\nZnak "=", który widzieliśmy już wczesnie to operator przypisania. Przypisuje on wartość zmiennej.	//1) ---------------------------------------------------\n/*\r\nprzykładowe operatory przypisania wartości\r\n=    przypisanie wartość\r\n+=    dodanie liczby lub dołączenie stringu\r\n*=    pomnożenie przez liczbę\r\n\r\nprzykładowe operatory matematyczne\r\n+    dodawanie\r\n-    odejmowanie\r\n*    mnożenie\r\n/    dzielenie\r\n\r\nprzykładowe operatory porównania\r\n===    równy\r\n!==    nierówny\r\n<    mniejszy\r\n>    większy\r\n<=    mniejszy lub równy\r\n>=    większy lub równy\r\n\r\nprzykładowe operatory logiczne\r\n&&    oraz\r\n||    lub\r\n!    zaprzeczenie (zmienia "true" w "false" i odwrotnie)\r\n\r\n*/\r\n\r\n// przykład zaprzeczenia\r\nvar uwielbiamSzkole = true;\r\nvar jakJest = !uwielbiamSzkole;\n\n\n//2) ---------------------------------------------------\nvar bestGame = "Lubię grać";	92
95	91	medium	Inkrementacja, operator z przypisaniem	________________________________________________________\n1)\nCzęsto korzysta się z operatorów łączących prostą operację z przypisaniem. \r\n\r\n\r\nTaki operator składa sie zawsze ze znaku operacji (lewy znak) oraz znaku przypisania (prawy znak).\r\n\r\n\r\nDziałanie operatora z przypisaniem:\r\n\r\n1. zmienna po lewej stronie operatora jest poddawana operacj z lewego znaku operatora\r\n\r\n2. a następnie od razu wynik tego działania zostaje zapisany tej samej zmiennej jako jej nowa wartość.\n\n\n________________________________________________________\n2)\nCzęsto korzysta się z operatorów inkrementacji ji dekrementacji.\r\n\r\n- inkrementacja - powiększenie liczby o 1, operator: "++"\r\n- dekrementacja - zmniejszenie liczby o 1,  operator: "--"\r\n\r\n\r\nInkrementacja i dekrementacja są powszechnie stosowane w pętlach, jak to zobaczymy dalej.	//1) ---------------------------------------------------\nvar bestGame = "Lubię grać w: "; \r\nbestGame += "Overwatch";\r\nbestGame += ", Wiedźmin.";\r\n\r\n// teraz bestGame ma wartość: \r\n"Lubię grać w: Overwatch, Wiedźmin."\r\n\r\n// --------------------------------------------------------\r\nvar wynik = 750;\r\nvar nGier = 30;\r\nwynik /= nGier;    // dzielimy wynik przez nGier i od razu zapamiętujemy uzyskaną wartość w zmiennej "wynik"\r\n\r\n// teraz wynik ma wartość:\r\n250\n\n\n//2) ---------------------------------------------------\n// najczęściej wykorzystuje sie inkrementację w pętli "for" \r\n\r\n\r\n// tu "i" rośnie przy każdym powtórzeniu\r\n\r\nfor(var i = 0; i < 5; i++ ) {\r\n    // tu nastepują instrukcje wewnątrz "for" \r\n    // mogą wykorzystać aktualną wartość "i"\r\n}\r\n\r\n\r\n\r\n// tu "i" maleje przy każdym powtórzeniu\r\n\r\nfor(var i = nReps; i > 0; i-- ) {\r\n    // tu nastepują instrukcje wewnątrz "for" \r\n    // mogą wykorzystać aktualną wartość "i"\r\n}	95
99	98	medium	Co to jest tablica	________________________________________________________\n1)\nTablica w programowaniu to zbiór wielu elementów tego samego typu.\r\n\r\nNp. zbiór wielu liczb lub wielu stringów.\n\n\n________________________________________________________\n2)\nElementy w tablicy są ponumerowane - każdy ma swój numer.\r\n\r\nNumer danego elementu w tablicy to jego "indeks".\r\n\r\nTablice są indeksowane od zera - tzn. pierwszy element ma indeks 0, drugi: 1, trzeci: 2, itd..\r\n\r\nDostęp do elementu tablicy otrzymujemy podając jego indeks w nawiasach kwadratowych po nazwie tablicy.	//1) ---------------------------------------------------\nvar millHawkCrew = ["Han Solo", "Chewbacca", "R2-D2", "C3PO"];\r\n\r\n\r\nvar money = [0.10, 0.20, 0.50, 1, 2, 5, 10, 50, 100];\n\n\n//2) ---------------------------------------------------\nvar badGuys = ["Imperator", "Darth Vader", "Kylo Ren"];\r\n\r\nvar youngestOne = badGuys[2];	99
102	98	medium	Używanie tablicy	________________________________________________________\n1)\nTablicę można utworzyć i następnie:\r\n- albo pozostawić pustą,\r\n- albo od razu wpisać do niej wartości,\r\n- albo przypisać wartości jej elementom później.\r\n\r\nTworząc pustą tablicę możemy od razu podać jej rozmiar - w nawiasach kwadratowych.\n\n\n________________________________________________________\n2)\nMożna utworzyć tablicę ze stringu, dzieląc go na części oddzielone wskazanym przez nas znakiem.\r\n\r\nSłuży do tego funkcja string.split.\n\n\n________________________________________________________\n3)\nElement tablicy jest po prostu zmienną, tyle, że zamiast unikalnej nazwy jej nazwą jest nazwa tablicy z podanym indeksem.\r\n\r\nElement uchwycony w ten sposób możemy odczytać lub do przypisać mu nową wartość.	//1) ---------------------------------------------------\n// utworzyć i pozostawić pustą\r\nvar godGuys = [];\r\n\r\n\r\n// utworzyć i od razu wpisać do niej wartości\r\nvar goodGuys = ["Han Solo", "Luke", "R2D2"];\r\n\r\n\r\n// dodać nowe wartości do już istniejącej \r\nvar jedi = [3];\r\njedi[0] = "Yoda";\r\njedi[1] = "Obi-Wan";\r\njedi[2] = "Jar Jar Binks";\n\n\n//2) ---------------------------------------------------\nvar lodyRazem = "czeko-wani-trusk-orzech";\r\n\r\n// tablica powstanie po pozdzieleniu stringu na części \r\n// które oddziela w nim znak: "-" \r\nvar lody = lodyRazem.split("-");\r\nvar najlepsze = lody[0];\n\n\n//3) ---------------------------------------------------\nvar jedi = [3];\r\njedi[0] = "Yoda";\r\njedi[1] = "Obi-Wan";\r\njedi[2] = "Jar Jar Binks";\r\n\r\n// prostujemy okropną pomyłkę\r\njedi[2] = "Qui-Gon";	102
106	98	medium	Tablica dwuwymiarowa	________________________________________________________\n1)\nTablica dwuwymiarowa to po prostu zwykła tablica, tylko jej elementy również są tablicami.\r\n\r\nZapisujemy ją podając drugi nawias kwadratowy po pierwszym.\r\n\r\nW drugim nawiasie będziemy podawali indeksy tablicy, która jest elementem tablicy nadrzędnej (wskazanym w pierwszym nawiasie).\r\n\r\nDługość każdego z wymiarów tablicy może być różna.\n\n\n________________________________________________________\n2)\nTablicę dwuwymiarową tworzy się tak jak jednowymiarową pamiętając jedynie o drugim kwadratowym nawiasie.\n\n\n________________________________________________________\n3)\nDostęp do elementu również działa tak samo z jedyną różnicą, że teraz trzeba podać dwa indeksy:\r\n- indeks pierwszego wymiaru tablicy (w naszym przykładzie to ludzie)\r\n- indeks drugiego wymiaru (to już konkretne osoby).	//1) ---------------------------------------------------\nvar peopleAndRobots = [2][3];\n\n\n//2) ---------------------------------------------------\nvar peopleAndRobots = [2];\r\npeopleAndRobots[0] = [3];\r\npeopleAndRobots[1] = [3];\r\n\r\npeopleAndRobots[0][0] = "Anakin";\r\npeopleAndRobots[0][1] = "Jabba";\r\npeopleAndRobots[0][2] = "Leia";\r\n\r\npeopleAndRobots[1][0] = "R2D2";\r\npeopleAndRobots[1][1] = "C3PO";\r\npeopleAndRobots[1][2] = "BB-8";\n\n\n//3) ---------------------------------------------------\nvar peopleAndRobots = [2];\r\npeopleAndRobots[0] = [3];\r\npeopleAndRobots[1] = [3];\r\n\r\npeopleAndRobots[0][1] = "Jabba";\r\n\r\n// znów pomyłka!\r\nvar myFavourite = peopleAndRobots[0][1];\r\n\r\n// poprawiamy\r\npeopleAndRobots[0][1] = "Kylo Ren";\r\n\r\n// hmm, na pewno?...\r\nmyFavourite = peopleAndRobots[0][1];	106
111	110	medium	Instrukcja "if"	________________________________________________________\n1)\nInstrukcja "if" sprawdza warunek, który podajemy w nawiasach.\r\n\r\nWarunek to może być: \r\n- zmienna, \r\n- lub instrukcja (bez średnika na końcu), która zwraca wartość "true" lub "false".\r\n- lub kilka zmiennych albo instrukcji połączonych operatorami logicznymi\n\n\n________________________________________________________\n2)\nInstrukcja "if" może zawierać wariant, który się wykona, gdy warunek nie jest spełniony.\r\n\r\nW tym celu dodajemy do drugi element : "else".\n\n\n________________________________________________________\n3)\nInstrukcja "if" może sprawdzać po kolei wiele warunków.\r\n\r\nKolejne warunki sprawdza się dodając element "if else" z jego warunkiem w nawiasach.\r\nElement "if else" trzeba dodać tyle razy ile jest kolejnych warunków do sprawdzenia.\r\n\r\nNa końcu można też dodać element "else", jeżeli jest potrzebny.	//1) ---------------------------------------------------\nvar iloscCzeko = 3;\r\n\r\n\r\n// warunkiem "if" jest zmienna\r\nvar lubieLodyCzeko = true;\r\nif (lubieLodyCzeko)\r\n    iloscCzeko = iloscCzeko * 0.5;\r\n\r\n\r\n// warunek: instrukcja zwracająca "true" lub "false"\r\nvar liczbaGosci = 3;\r\nif (liczbaGosci > 1) \r\n    iloscCzeko = 0;\r\n\r\n\r\n// warunek: kilka elementów połączonych operatorami logicznymi\r\nif (lubieLodyCzeko && liczbaGosci > 0) \r\n    iloscCzeko = 0;\n\n\n//2) ---------------------------------------------------\nvar iloscCzeko = 3;\r\nvar iloscPizzy = 2;\r\n\r\n\r\nvar lubieLodyCzeko = true;\r\nif (lubieLodyCzeko)\r\n    iloscCzeko = iloscCzeko * 0.5;\r\nelse\r\n    iloscPizzy -= 1;\n\n\n//3) ---------------------------------------------------\nvar iloscCzeko = 3;\r\nvar iloscPizzy = 2;\r\n\r\nvar czujeGlod = 1;\r\nvar lubieLodyCzeko = false;\r\nvar lubiePizze = false;\r\n\r\nif (lubieLodyCzeko)\r\n    iloscCzeko = iloscCzeko * 0.5;\r\nelse if (lubiePizze)\r\n    iloscPizzy -= 1;\r\nelse\r\n    czujeGlod += 3;	111
115	110	medium	Pętla "for"	________________________________________________________\n1)\nPętla "for" służy do wielokrotnego wykonania instrukcji, która znajduje się bezpośrednio za nią.\r\n\r\nMoże to być pojedyncza instrukcja lub blok instrukcji (w nawiasach klamrowych - o bloku instrukcji za chwilę).\n\n\n________________________________________________________\n2)\nPętlę "for" tworzy się :\r\n- pisząc słowo "for"\r\n- za nim nawiasy okrągłe\r\n- w tych nawiasach 3 krótkie instrukcje oddzielone 2 średnikami:\r\n    1. utworzenie iteratora (o nim za chwilę)\r\n    2. warunek przerwania pętli\r\n    3. instrukcja do wykonania po każdym obrocie pętli 	//2) ---------------------------------------------------\nvar imperatorMeetings = 20;\r\nvar anakinDarkSide = 0;\r\n\r\n\r\n// ciemna strona mocy Anakina rośnie po każdym \r\n// spotkaniu z Imperatorem\r\nfor (var i = 0; i < imperatorMeetings; i++) \r\n    anakinDarkSide += 25;\r\n\r\n// ZAGADKA:\r\n// Jak silna jest teraz Ciemna Strona w Anakinie?	115
32	29	easy	Wstawienie elementu do innego	Wstawienie jednego elementu DOM do innego - czyli wstawienie pudełka do środka innnego pudełka - polega na:\r\n- wpisaniu tagów początku i końca wewnętrznego elementu...\r\n- ...pomiędzy tagi początku i końca zewnętrznego elementu.	<div>\r\n    <div>Tekst na mojej stronie</div>\r\n</div>	32
34	33	medium	3 główne pudełka	________________________________________________________\n1)\nWszystkie pudełka, z których zbudowana jest strona internetowa znajdują się w jednym, głównym pudełku - jego tag to <html>.\r\n\r\nPudełko <html></html> rozciąga się na całe okno przeglądarki.\n\n\n________________________________________________________\n2)\nW pudełku "html" znajdują się 2 pudełka zawierające 2 główne składniki strony: \r\n- pudełko "head" (nie będziemy się nim tu zajmowali),\r\n- pudełko "body" - tu znajduje się wszystko co widzisz na stronie internetowej.	//2) ---------------------------------------------------\n<html>\r\n\r\n    <head>\r\n    </head>\r\n\r\n    <body>\r\n        <div>\r\n            ….\r\n        </div>\r\n    </body>\r\n\r\n</html>	34
118	110	medium	Iterator i zagnieżdżenie "for"	________________________________________________________\n1)\n"Iterator" to liczba, która jest podnoszona o 1 po zakończeniu każdego obrotu pętli.\r\n\r\nMa 2 funkcje:\r\n- gdy przekroczy podaną wartość - pętla zostaje zakończona,\r\n- wewnątrz pętli może być wykorzystany jako zmienna.\n\n\n________________________________________________________\n2)\nPętle można umieszczać wewnątrz innych pętli.\r\n\r\nW tym celu po prostu jako instrukcję do wykonania wewnątrz "for" piszemy drugi "for".\r\n\r\nW każdym obrocie zewnętrznego "for" (w przykładzie są 2 takie obroty) wykona się cały wewnętrzny "for" (w przykładzie wywołuje swoją instrukcję 4 razy). W efekcie liczba wywołań instrukcji wewnętrznego "for" w przykładzie to iloczyn 2 i 4, czyli 8 razy.	//1) ---------------------------------------------------\nvar znajomi =  ["Zdzisław", "Zenon", "Masa", "Rychu"];\r\nvar najnowszyZnajomy;\r\nvar listaGosci = "";\r\n\r\nfor (var i = 0; i < znajomi.length; i++) {\r\n    listaGosci += " - " + znajomi[i];\r\n    najnowszyZnajomy = znajomi[i];\r\n}\r\n\r\n// teraz zmienne mają takie wartości: \r\n//      listaGosci = "Zdzisław - Zenon - Masa - Rychu"\r\n//      najnowszyZnajomy = "Rychu"\n\n\n//2) ---------------------------------------------------\nvar znajomi =  ["Zdzisław", "Zenon", "Masa", "Rychu"];\r\nvar nieznajomi = ["Złotnik", "Biznesman", "Jubiler", "Bankier"];\r\nvar wszyscy = [znajomi, nieznajomi];\r\n\r\nvar listaGosci = "";\r\n\r\nfor (var i = 0; i < 2; i++) \r\n    for (var j = 0; j < 4; j++)\r\n        listaGosci += ", " + wszyscy[i][j];\r\n\r\n// ZAGADKA:\r\n// Kto jest pierwszy w utworzonym stringu - Masa czy Złotnik?\r\n// Jak zmienić ten podwójny "for", żeby zamienić kolejność tych dwóch\r\n// szacownych, praworządnych obywateli? (nie muszą sąsiadować)	118
122	121	medium	Blok kilku instrukcji	________________________________________________________\n1)\nJeżeli po spełnieniu jakiegoś warunku program ma wykonać jedną instrukcję to można ja podać po prostu w kolejnej linii. (O warunkach dowiesz się już kilka modułów dalej)\r\n\r\n\r\nJeżeli jednak ma on wykonać kilka instrukcji oraz ma ich wszystkich NIE wykonywać, jeśli warunek nie jest spełniony, to trzeba je zamknąć między nawiasami klamrowymi "{ ... }"\r\n\r\nInstrukcje umieszczone pomiędzy nawiasami tworzą "blok instrukcji".\r\n\r\nKod wewnątrz każdego bloku musi mieć większy odstęp od marginesu (być głębiej wcięty) niż kod, który go otacza. Wtedy taki kod jest czytelny.\n\n\n________________________________________________________\n2)\nZmienna utworzona wewnątrz bloku instrukcji będzie widoczna tylko wewnątrz tego bloku.\r\n\r\nCzęsto bloki umieszczane są wewnątrz innych bloków.\r\n\r\nZmienna utworzona wewnątrz bloku zawsze\r\n- jest widoczna w tym bloku \r\n- jest widoczna w blokach zagnieżdżonych w tym bloku,\r\n- NIE jest widoczna na zewnątrz tego bloku.	//1) ---------------------------------------------------\nvar marekLubiBulki = false;\r\nvar liczbaBulek = 4;\r\nvar marekZjadl;\r\n\r\n\r\n// Wersja 1. pojedyncza instrukcja zależna od warunku\r\n// ----------------------------------------------------\r\nif (marekLubiBulki === true) \r\n    liczbaBulek = 8;\r\n\r\nmarekZjadl = 4;\r\n\r\n// ile więc bułek zostanie dla mnie?\r\nvar mogeZjesc = liczbaBulek - marekZjadl;\r\n\r\n\r\n\r\n// Wersja 2. blok instrukcji  zależny od warunku\r\n// ----------------------------------------------------\r\n// jeśli Marek nie lubi bułek to dla mnie zostaną 4.\r\nif (marekLubiBulki === true) {\r\n    liczbaBulek = 8;\r\n    marekZjadl = 4;\r\n}\r\n\r\nvar mogeZjesc = liczbaBulek - marekZjadl;\n\n\n//2) ---------------------------------------------------\nvar marekLubiBulki = true;\r\nvar liczbaBulek = 4;\r\n\r\nif (marekLubiBulki === true) {\r\n    liczbaBulek = 8;\r\n    var marekZjadl = 4; // tworzymy zmienną WEWNĄTRZ bloku\r\n}\r\n\r\n// BŁĄD - zmienna "marekZjadl" nie jest tu widoczna\r\nvar mogeZjesc = liczbaBulek - marekZjadl;   \r\n	122
125	121	medium	Zmienne globalne i lokalne	________________________________________________________\n1)\nZmienna może być dostępna w każdym miejscu kodu, lub tylko wewnątrz funkcji. (co to jest funkcja dowiesz się już za chwilę).\r\n\r\nMówimy wtedy, że zmienna ma "zakres widoczności globalny" lub "zakres widoczności lokalny".\r\n\r\nAby zmienna miała globalny zakres (widoczności) trzeba ją utworzyć poza funkcją.\n\n\n________________________________________________________\n2)\nUWAGA: w JavaScript zmienną można utworzyć podając tylko jej nazwę - bez słowa "var".\r\n\r\nTaka zmienna ma zakres globalny.\r\n\r\nNIGDY nie używaj tej możliwości, ponieważ może prowadzić do nieprzewidzianych efektów twojego kodu - twórz zmienne używając "var".	//1) ---------------------------------------------------\nvar globalVar = 5;\r\n\r\nfunction mojaFunkcja() {\r\n    var localVar = 3;\r\n}\r\n\r\nvar total = globalVar + localVar;\r\n// BŁĄD zmienna local nie jest tu widoczna	125
129	128	medium	Funkcje	________________________________________________________\n1)\nFunkcja to fragment kodu, w którym jest jedna lub więcej instrukcji.\r\n\r\nFunkcję tworzy się pisząc \r\n- słowo "function" \r\n- po nim nazwę funkcji\r\n- potem zmknięte nawiasy "()"\r\n- potem nawiasy klamrowe, między którymi umieszcza się instrukcje funkcji\n\n\n________________________________________________________\n2)\n1. Funkcję pisze się tylko raz, a można ją wywołać wielokrotnie, w różnych miejscach kodu.\r\n\r\n2. Nazwa funkcji mówi, co ta funkcja robi. Dzięki temu, gdy w kodzie jakiś fragment zastąpi się funkcją to kod staje się bardziej czytelny.	//1) ---------------------------------------------------\nvar empireShips = 120;\r\nvar hawkFullyArmed = true;\r\n\r\n\r\n// Millenium Hawk niszczy część floty Imperium\r\nfunction millHawkAttack() {\r\n    if (hawkFullyArmed === true)\r\n        empireShips = empireShips * 0.3;\r\n    else\r\n        empireShips = empireShips * 0.8;\r\n}	129
132	128	medium	Utworzenie i wykorzystanie funkcji	________________________________________________________\n1)\nDo funkcji można przekazać argumenty.\r\n\r\n"Argument" funkcji to zmienna, która zostanie wykorzystana przez instrukcje funkcji.\r\n\r\nArgumenty podaje się w nawiasach za nazwą funkcji.\r\nJeśli argumentów jest wiele - oddziela się je przecinkami.\n\n\n________________________________________________________\n2)\nFunkcję wywołuje się podając jej nazwę.\r\n\r\nJeśli pobiera ona jakieś argumenty to podaje się je w nawiasach po nazwie, oddzielając przecinkami.	//1) ---------------------------------------------------\nvar empireShips = 120;\r\n\r\n// Millenium Hawk niszczy część floty Imperium\r\nfunction millHawkAttack(hawkFullyArmed, battleLength) {\r\n    if (hawkFullyArmed === true)\r\n        empireShips = empireShips - 5 * battleLength;\r\n    else\r\n        empireShips = empireShips - 2 * battleLength;\r\n}\n\n\n//2) ---------------------------------------------------\nvar empireShips = 120;\r\nvar bountyHunterShips = 15;\r\n\r\n// Millenium Hawk niszczy część floty Imperium\r\n// battleLength : czas bitwy w minutach\r\nfunction millHawkAttack(hawkFullyArmed, battleLength) {\r\n    if (hawkFullyArmed === true)\r\n        empireShips = empireShips - 5 * battleLength;\r\n    else\r\n        empireShips = empireShips - 2 * battleLength;\r\n}\r\n\r\nmillHawkAttack(true, 10);\r\n\r\nvar enemyStrength = empireShips + bountyHunterShips;	132
135	128	medium	Używanie funkcji	________________________________________________________\n1)\nFunkcja może wykonać operacje na zmiennych globalnych. Po jej wykonaniu mają one inne wartości niż przedtem.\n\n\n________________________________________________________\n2)\nFunkcja może też tworzyć i oddawać jakiś wynik w postaci danych. \r\n\r\nAby funkcja coś zwracała trzeba użyć słowa "return" i po nim podać to, co funkcja zwraca.\r\n\r\nWynik funkcji może mieć dowolny typ: liczba, string, typ logiczny, itd..	//1) ---------------------------------------------------\nvar zostaloPizzySzt = 2;\r\nvar jestemGlodny = true;\r\nvar czujeSieSwietnie = 8;\r\n\r\n\r\nfunction jemPizze(tyleZjadlem) {\r\n    zostaloPizzySzt -= tyleZjadlem;\r\n    \r\n    if (tyleZjadlem >= 1)\r\n        jestemGlodny = false;\r\n\r\n    // moje samopoczucie spada, jeśli zjadłem za dużo\r\n    var zLakomstwa = tyleZjadlem - 1;\r\n    if (zLakomstwa > 0)\r\n        czujeSieSwietnie -= zLakomstwa * 2;\r\n}\n\n\n//2) ---------------------------------------------------\nvar jestemGlodny = true;\r\nvar czujeSieSwietnie = 8;\r\n\r\n\r\nfunction jemPizze(pizzaSzt, tyleZjadlem) {\r\n    if (tyleZjadlem >= 1)\r\n        jestemGlodny = false;\r\n\r\n    // moje samopoczucie spada, jeśli zjadłem za dużo\r\n    var zLakomstwa = tyleZjadlem - 1;\r\n    if (zLakomstwa > 0)\r\n        czujeSieSwietnie -= zLakomstwa * 3;\r\n    \r\n    return PizzaSzt - tyleZjadlem;\r\n}\r\n\r\nvar zostaloPizzySzt = jemPizze(2, 1.5);\r\n	135
139	138	medium	Pobranie referencji do elementu	________________________________________________________\n1)\nJavaScript może dodawać, usuwać, zmieniać elementy DOM.\r\n\r\nAby wpływać na istniejący element kod JavaScript musi utworzyć referencję do tego elementu.\r\n\r\n"Referencja" to zmienna, która przechowuje ten element.\r\n\r\nRerefencję do elementu DOM uzyskuje się funkcją GetElementById(), której atrybutem jest "id" tego elementu.\r\n\r\nJest to funkcja elementu "document" - czyli korzenia drzewa DOM (głównego elementu strony, do którego powkładane są wszystkie inne.).\r\n\r\n(Wszystkie pudełka, z których zbudowana jest strona internetowa znajdują się w jednym, głównym. To pudełko nazwywa się "html". W nim znajdują się kolejne pudełka, a w nich kolejne - i tak coraz głębiej. To główne pudełko dla kodu JavaScript jest dostępne jako zmienna globalna "document".)\r\n\n\n\n________________________________________________________\n2)\nWewnątrz tagu <div> można umieścić:\r\n- tekst,\r\n- inne elementy DOM.\r\n\r\nInne elementy umieszcza się wpisując tam tekst który jest kodem HTML.\r\n\r\nUstawienie tekstu dla <div> wykonuje się w JavaScript przypisując wartość atrybutowi "innerHTML".	//1) ---------------------------------------------------\nvar przyciskAkcja = document.GetEllementById("przycAkcja");\n\n\n//2) ---------------------------------------------------\n<div>Dark Side of The Force Always Prevails...</div>\r\n\r\n<div id="empireFleet"></div>\r\n\r\n<script>\r\n    var divEmpFleet = document.GetElementById("empireFleet"); \r\n    divEmpFleet.innerHTML = 120;\r\n</script>	139
142	138	medium	Tworzenie elementów DOM w JavaScript	________________________________________________________\n1)\nJeden z elementów HTML to tabelka z wierszami.\r\n\r\nTagi do utworzenia tabelki to:\r\n<table></table> : pudełko z tabelką w środku\r\n<tr></tr>  : jeden wiersz tabelki\r\n<td></td>  : jedna komórka wiersza\n\n\n________________________________________________________\n2)\nAby wstawić tabelkę do <div> możemy\r\n1. utworzyć string z jej kodem HTML\r\n2. wstawić ten tekst do naszego <div>	//1) ---------------------------------------------------\n<-- tworzymy czarno-białą szachownicę z 4 pól -->\r\n<table>\r\n    <tr>\r\n        <td>białe</td>\r\n        <td>czarne</td>\r\n    </tr>\r\n    <tr>\r\n        <td>czarne</td>\r\n        <td>białe</td>\r\n    </tr>\r\n</table>\n\n\n//2) ---------------------------------------------------\n// tworzymy zmienną, w której znajdzie się kod HTML tabelki\r\nvar htmlTabelki = "<table>";\r\n\r\n\r\n// w pętli "for" tworzymy wiersze…\r\n// a w nich w wewnętrznej pętli "for" tworzymy komórki wierszy\r\nfor (var row = 0; row < 2; row++) {\r\n\r\n   htmlTabelki += "<tr>";\r\n\r\n    for (var column = 0; column < 2; column++)\r\n        htmlTabelk += "<td></td>";\r\n\r\n    htmlTabelki += "</tr>";\r\n}\r\n\r\n\r\n// wstawiamy gotowy kod HTML do <div>\r\nvar divSzachy = document.GetElementById("szachy");\r\ndivSzachy.innerHTML = kodTabelki;	142
146	145	medium	Pobranie i wykorzystanie wartości input	________________________________________________________\n1)\nElement "input" typu "text" pozwala użytkownikowi wpisać tekst.\r\n\r\nMożna tam wpisać np. liczbę.\r\n\r\nTaki tekst można potem pobrać w JavaScript odczytując atrybut "value" tego elementu "input".\n\n\n________________________________________________________\n2)\nMożemy przechowywać dane wszystkich pól naszej tabelki w osobnej tablicy.\r\nTo daje nam wygodną możliwość manipulowania tymi danymi.\r\n\r\nTę tablicę możemy wypełnić danymi w takiej samej podwójnej pętli.\r\nW grze "Saper" pola mają wartość "1" lub "0" = "mina" lub "czysto".\r\n\r\n\r\n("Math.random() " tworzy liczbę losową pomiędzy 0 a 1.\r\nZAGADKA: jakich pól będzie więcej w naszej tablicy - zaminowanych czy czystych?)	//1) ---------------------------------------------------\n<input id="mineFieldSize" type="text">\r\n\r\n<script>\r\n    var textSize = document.GetElementById("mineFieldSize");\r\n    var size = textSize.value;\r\n</script>\n\n\n//2) ---------------------------------------------------\n// tworzymy tablicę danych\r\nvar board = [2][2];\r\n\r\n\r\n// w podówjnej pętli "for" wpisujemy dane tablicy\r\nfor (var row = 0; row < 2; row++)\r\n    for (var column = 0; column < 2; column++)\r\n        if (Math.random() < 0.2)\r\n            board[row][column] = 1;\r\n        else\r\n            board[row][column] = 0;\r\n	146
149	145	medium	Modyfikacja elementu	________________________________________________________\n1)\nJednym z atrybutów dlementu DOM jest tablica jego klas CSS.\r\n\r\nTen trybut ma nazwę : "classList".\r\n\r\n"Klasa CSS" to zbiór ustawień wyglądu elementu posiadający swoją nazwę.\r\n\r\nElement może mieć wiele klas CSS w swoim "classList".\n\n\n________________________________________________________\n2)\nKlasy CSS można dodawać do elemenu funkcją JavaScript  add().\r\n\r\nPrzykład pokazuje również drugi mechanizm - w JavaScript można wywoływać kolejne polecenia oddzielając je tylko kropkami. Np. tutaj w jednej linii wykonuje się:\r\n  1. pobranie referencji do elementu \r\n  2. pobranie atrybutu "classList" tego elementu\r\n  3. dodanie do "classList" klasy "loaded"	//2) ---------------------------------------------------\n<div id="singleField">\r\n\r\n<script>\r\n    document.GetElementById("singleField").classList.add("loaded");\r\n</script>	149
153	152	medium	Zdarzenie (event)	________________________________________________________\n1)\n"Event" w JavaScript reprezentuje pojedyncze zdarzenie w przeglądarce. \r\n\r\nTakim zdarzeniem może być:\r\n- kliknięcie elementu lewym przyciskiem myszy,\r\n- kliknięcie elementu prawym przyciskiem myszy,\r\n- zakończenie ładowania strony przez przeglądarkę,\r\n- i wiele innych.\n\n\n________________________________________________________\n2)\nEvent w istocie jest obiektem, który posiada swoje atrybuty. \r\n\r\nWśród tych atrybutów znajdują się:\r\n- obiekt, który ten event wywołał (np okreslony przycisk),\r\n- obiekty, które mają zareagować na wywołanie tego eventu (jedna lub wiele funkcji),\r\n- sposób wywołania - np czy to lewy czy prawy przycisk myszy.\r\n\r\nWywołanie eventu powoduje wywołanie wszystkich funkcji, które mają na niego zareagować. Otrzymują go i mogą odczytać jego atrybuty.		153
156	152	medium	Dodanie akcji do elementu	________________________________________________________\n1)\nEvent "click" to event wywoływany w chwilli kliknięcia danego elementu lewym przyciskiem myszy.\r\n\r\nDopóki nie przypiszemy mu żadnej funkcji to kliknięcie nie spowoduje żadnej reakcji.\r\n\r\nReakcja pojawi się po kliknięciu gdy przypiszemy mu funkcję JavaScript.\n\n\n________________________________________________________\n2)\nDo elementu, który nie jest przyciskiem można też dodać akcję na event "click".\r\n\r\nDo tego celu służy funkcja "AddEventListener("click", ...)"	//1) ---------------------------------------------------\n<-- ten przycisk nic nie robi -->\r\n<input type="button" value="Feeble attack">\r\n\r\n\r\n<-- ten przycisk otwiera piekło dla Imperium -->\r\n<input type="button" value="FireAndFury"  click="millHawkAttack()">\r\n\n\n\n//2) ---------------------------------------------------\n<-- Na razie nikt nie bierze Jar Jara pod uwagę -->\r\n<div id="JarJar">Jar Jar is never what you expect.</div>\r\n\r\n<script>\r\n    // teraz nabiorą do niego respektu!\r\n    var butJarJar = document.GetElementById("JarJar");\r\n    butJarJar.addEventListener("click", blowTheGenerator);\r\n</script>	156
162	152	medium	Event "contextmenu"	________________________________________________________\n1)\nEvent "contextmenu" to po prostu event wywoływany prawym przyciskiem myszy.\r\n\r\nDodaje się go do elementu tak samo jak inne.\n\n\n________________________________________________________\n2)\nJednak przeglądarka ma na stałe ustawioną domyślną akcję na prawy przycisk myszy. Jest to otwarcie menu kontekstowego.\r\n\r\nJeśli chcemy tę akcję wyłączyć należy użyć funkcji "preventDefault".	//1) ---------------------------------------------------\n<-- Teraz Jar Jar już powinien uważać  -->\r\n<div id="JarJar">Jar Jar is never what you expect.</div>\r\n\r\n<script>\r\n    // .. musimy mu dać nową umiejętność\r\n    var butJarJar = document.GetElementById("JarJar");\r\n    butJarJar.addEventListener("contextemu", teleportElsewhere);\r\n</script>\n\n\n//2) ---------------------------------------------------\nfunction blowTheGenerator(e) {\r\n    // wyłączamy domyślną akcję prawego przycisku myszy\r\n    e.preventDefault();    \r\n\r\n    // teraz menu kontekstowe już się nie otworzy\r\n    // możemy wykonywać naszą akcję dla prawdgo przycisku\r\n}	162
2	1	medium	Przedmiot tego kursu	________________________________________________________\n1)\nCelem tego kursu jest nauczenie niektórych podstawowych elementów programowania w takim zakresie, jaki umożliwia napisanie:\r\n- prostej strony internetowej w HTML,\r\n- działającego na tej stronie programu w JavaScript..\r\n\r\nOpanowanie tych elementów otwiera drogę do programowania w innych językach, ponieważ sposób myślenia programistycznego i pojęcia są tam takie sam lub bardzo podobne.\r\n\r\nUWAGA: dla uproszczenia podajemy tu podstawowe zasady i narzędzia języka programowania nie zaznaczajac które są właściwe tylko dla JavaScript. Większość z nich jest jednak uniwersalna dla wszystkich języków. Tam gdzie nie jest - oszczędzamy tu użytkownikowi wchodzenia w szczegóły, zakładając, że jeśli zainteresuje się programowaniem to pozna szczegóły innych języków w swoim dalszym rozwoju.\n\n\n________________________________________________________\n2)\nZakres tego kursu jest mały po to, żeby umożliwić wejście w świat programowania w możliwie łatwy sposób.\r\n\r\nNie uczymy tu w szczególności CSS, który jest potrzebny do tworzenia stron internetowych. \r\nAby opanować go w podstawowym zakresie potrzebny jest jednak znacznie krótszy kurs niż ten.\r\nNa dodatek zrozumienie czym jest strona internetowa, które umożliwiamy tutaj, ułatwia zrozumienie CSS.		2
13	5	medium	Środowisko programistyczne	________________________________________________________\n1)\nProgramy pisze się przy użyciu innych programów, specjalnie zbudowanych do pisania programów. ... :)\r\n\r\nProgram do pisania programów to IDE, czyli Integrated Development Environment.\r\n(Dlatego taki program programiści określają mianem "środowisko" - environment).\n\n\n________________________________________________________\n2)\nIDE bardzo ułatwia pracę.\r\n\r\nDo tworzenia stron internetowych można użyć np. darmowego środowiska NetBeans.\r\n\r\nTworząc nowy projekt typu "strona www" NetBeans automatycznie tworzy strukturę strony oddając gotowy szkielet do wypełnienia użytkownikowi. Generuje "html", "head" i "body", wypełnia "head" niezbędnym minimum wpisów. (O tych elementach strony mówimy w nieco dalej.)\n\n\n________________________________________________________\n3)\nIDE wskazuje błędy w kodzie i daje wskazówki na czym polegają.\r\n\r\nKoloruje tekst ułatwiając rozróżnienie słów kluczowych, zmiennych, stringów itd.\r\n\r\nAutomatycznie formatuje tekst poprawiając jego czytelność.\r\n\r\nI oferuje wiele innych funkcji ułatwiających tworzenie kodu.\r\n\r\n(Edytor kodu dla użytkownika w tym kursie również posiada nieco takich funkcji.)		13
18	17	medium	Co to jest strona internetowa	________________________________________________________\n1)\n"Strona internetowa" to jeden lub więcej plików tekstowych.\r\n\r\nTekst w tych plikach to kod trzech rodzajów: HTML, CSS i JavaScript. (Wyjaśnimy je za chwilę.)\n\n\n________________________________________________________\n2)\nPliki strony są pobierane na Twój komputer przez przeglądarkę.\r\n\r\nPrzeglądarka to po prostu program komputerowy, który umie :\r\n- pobrać dane z Internetu,\r\n- wykonać otrzymany kod HTML, CSS i JavaScript,\r\n- wyświetlić w swoim oknie wynik wykonania tego kodu.		18
21	17	medium	3 składniki strony internetowej	________________________________________________________\n1)\nHTML to język, który buduje szkielet strony. \r\n\r\nSzkielet strony można porównać do wielu pudełek powkładanych jedne w drugie. Aby utworzyć te pudełka i przydzielić im miejsce - pisze się HTML. Jedno takie pudełko to prostokąt wydzielony na ekranie. Strona to wiele coraz mniejszych prostokątów w innych prostokątach.\r\n\r\nKod HTML to jednoznaczna instrukcja dla przeglądarki z czego i jak zbudować stronę. To taka sama instrukcja jak instrukcja składania mebla albo zestawu LEGO. Jedyna różnica to ta, że przeglądarka sama na miejscu wytwarza potrzebne elementy.\n\n\n________________________________________________________\n2)\nKod CSS ustawia wygląd wszystkich pudełek strony www.\r\n\r\nW ramach tego kursu nie będziemy się nim zajmowali. \r\n\r\n(Ćwiczenia przygotowane dalej otrzymują gotowy kod CSS.)\n\n\n________________________________________________________\n3)\nJavaScript to język, bez którego strona po wczytaniu pozostawałaby zawsze nie zmieniona i oprócz linków do innych adresów nic innego by na niej nie działało.\r\n\r\nW JavaScript napisane są procedury, które ożywiają stronę\r\n- działają przyciski,\r\n- można coś wpisać do pól formularzy i to wpływa na dalsze akcje,\r\n- strona zmienia wygląd.		21
45	\N	hard	JavaScript, komentarze	DO CZEGO SŁUŻY JAVASCRIPT\n=====================================================\n________________________________________________________\n1)\nJavaScript to język, w którym pisze się procedury, które coś robią i coś zmieniają.\r\n\r\nPrzykłady:\r\n- coś obliczają i wyświetlają wynik,\r\n- zmieniają wygląd strony,\r\n- pobierają dane z Internetu,\r\n- itd.\n\n\n________________________________________________________\n2)\nFunkcje JavaScript wywoływane są przez klikanie elementów DOM.\r\n\r\nNp. przycisk "przycAtak" tu wywołuje funkcję JavaScript "millHawkAttack()".\r\n\r\nPrzypisanie funkcji JavaScript do elementu "input" typu "button" dokonuje się przez przypisanie tej funkcji do atrybutu "click" tego przycisku. \r\n\r\n(O funkcjach JavaScript będziemy mówili dalej.)\n\n\n\n\nKOMENTARZE\n=====================================================\n________________________________________________________\n1)\n"Komentarz" to linia lub kilka linii w kodzie programu, które są niewidoczne dla komputera.\r\n\r\nAby były niewidoczne poprzedza się je podwójnym slash-em.\r\n\r\nBez "//" na początku komentarz powoduje błąd kompilacji, ponieważ jest niezrozumiały dla komputera.\n\n\n________________________________________________________\n2)\nKomentarz wyjaśnia krótko i jasno fragment kodu, który znajduje się za nim.\r\n\r\nKomentarze są bardzo ważne - pozwalają dużo szybciej zrozumieć kod. \r\n\r\nKażdy programista wie, że nawet jego własny kod po krótkim czasie wymaga wysiłku aby go zrozumieć. Ten wysiłek niepotrzebnie pochłania czas. \r\n\r\nDlatego każdy dobry programista pisze dużo komentarzy, bo to trwa krócej i jest łatwiejsze niż analiza kodu. Źli programiści nie piszą. Do ciebie należy wybór kim będziesz ;)	// DO CZEGO SŁUŻY JAVASCRIPT\n// =====================================================\n//2) ---------------------------------------------------\n   <input id="przycAtak" type="button" value="Atakuj"  click="millHawkAttack()">\r\n\n\n\n\n\n// KOMENTARZE\n// =====================================================\n//1) ---------------------------------------------------\n// Ta linia zaczyna się od "//"  -  to jest właśnie "komentarz"\r\n\r\nta linia nie zaczyna się od "//" i nie jest kodem - jak widzisz edytor wskazuje błąd\n\n\n//2) ---------------------------------------------------\nvar boardSize = 5;\r\nvar boardTable = [boardSize][boardSize];\r\nvar youAreKilled = false;\r\n\r\n\r\n// -------------------------------------------------------\r\n// fragment kodu bez komentarza - o co w nim chodzi?\r\n\r\nfor (var r = 0; r < boardSize; r++)\r\n    for (var c = 0; c < boardSize; c++)\r\n        if (boardTable[r][c] == 1) {\r\n            BAM(r, c);\r\n            youAreKilled = true;\r\n        }\r\n\r\n\r\n\r\n// -------------------------------------------------------\r\n// ten sam kod z komentarzem\r\n\r\n// Zdetonowanie wszystkich min na tablicy i zabicie sapera\r\nfor (var r = 0; r < boardSize; r++)\r\n    for (var c = 0; c < boardSize; c++)\r\n        if (boardTable[r][c] == 1) {\r\n            BAM(r, c);\r\n            youAreKilled = true;\r\n        }	45
52	\N	hard	Jak tworzyć kod łatwy do zrozumienia	CZYTELNOŚĆ DLA CZŁOWIEKA\n=====================================================\n________________________________________________________\n1)\nKażdy program to od kilkudziesięciu linii do kilkudziesięciu tysięcy linii kodu.\r\n\r\nBudowanie i rozwijanie programu trwa wiele miesięcy lub lat.\r\n\r\nAby zrozumieć nawet własny kod po paru tygodniach od napisania każdy programista musi go analizować na nowo. Zrozumienie cudzego kodu jest jeszcze trudniejsze.\r\n\r\nDlatego jednym z kryteriów dobrego kodu jest jego czytelność - czyli jak łatwo jest zrozumieć co on robi.\n\n\n________________________________________________________\n2)\nPracując nad programem zawsze wracasz do fragmentów napisanych wcześniej. \r\n\r\nAby poprawiać i korzystać z tego co już stworzyłeś musisz rozumieć jak to działa.\n\n\n________________________________________________________\n3)\nNiemal każdy program jest tworzony przez co najmniej kilku programistów.\r\n\r\nKażdy taki programista korzysta i zmienia fragmenty napisane przez kolegów.\r\n\r\nZrozumienie cudzego kodu jest trudniejsze niż zrozumienie własnego.\n\n\n________________________________________________________\n4)\nO czytelności kodu decyduje kilka elementów.\r\n\r\n- nazwy zmiennych i funkcji,\r\n- komentarze,\r\n- puste linie dzielące kod na wyraźnie widoczne bloki.\n\n\n________________________________________________________\n5)\nDobra nazwa:\r\n- jasno mówi co przechowuje dana zmienna lub co robi dana funkcja\r\n- jest możliwie krótka (optymalnie od 1 do 3 wyrazów)\r\n- wyraźnie, na pierwszy rzut oka różni się od innych \n\n\n\n\nJAK PISAĆ KOMENTARZE\n=====================================================\n________________________________________________________\n1)\nProgramista najłatwiej i najszybciej pisze kod, gdy przedtem zaplanował wszystkie jego części.\r\n\r\nDlatego bardzo dobrą praktyką jest :\r\n- NAJPIERW napisać serię komentarzy - w których znajdą się wszystkie części kodu.\r\n- POTEM pod komentarzami napisać kod, który robi to co w komentarzu.\r\n\r\nZazwyczaj taki plan obejmuje kod jednej funkcji (funkcje to fragmenty kodu wykonujące jakąś określoną czynność- dowiesz o nich więcej w dalszej części).\r\n\r\nBardzo często dodaje się również komentarze po napisaniu kodu, gdy jasne się staje że dany fragment tego wymaga dla szybszego zrozumienia.\n\n\n________________________________________________________\n2)\nNa 1 ekranie kodu powinno być kilka komentarzy.\r\n\r\nIch liczba jest większa gdy kod jest trudniejszy.\r\n\r\nIch liczba jest mniejsza gdy kod jest oczywisty, a nazwy zmiennych i funkcji są czytelne - wiadomo co w nich jest.\n\n\n________________________________________________________\n3)\nWiększość komentarzy to maksymalnie 1 linia tekstu.\r\n\r\nNiektóre komentarze mogą mieć wiele linii. Pisz takie wtedy, gdy czytającemu potrzebne jest ogólne wyjaśnienie jak to działa ta część programu.\n\n\n\n\nPUSTE LINIE\n=====================================================\n________________________________________________________\n1)\nPuste linie oddzielają od siebie fragmenty kodu.\r\n\r\nWizualnie ułatwiają analizę jego fragmentów - mózg szybciej rozumie dobrze poukładane grupy instrukcji.\r\n\r\nMożesz je zaobserwować we wszytskich przykładach tego kursu.\n\n\n________________________________________________________\n2)\nZawsze wstawiaj min 1 pustą linię przed komentarzem.\r\n\r\nGrupuj instrukcje składające się na jeden mały efekt. Zawsze oddzielaj takie grupy pojedynczą pustą linią.\r\n\r\nOddzielaj od siebie dwiema pustymi liniami dłuższe, logicznie powiązane fragmenty kodu, składające się z wielu grup.	// CZYTELNOŚĆ DLA CZŁOWIEKA\n// =====================================================\n//5) ---------------------------------------------------\n// nazwy zmiennych, które nic nie mówią\r\nvar etta = 10;\r\nvar ivc = true;\r\n\r\n// nazwy zmiennych, które są zrozumiałe\r\nvar enemyArrivalTime = 10;\r\nvar isVaderComing = true;\r\n\r\n// zmienne mniej i zmienne więcej mówiące\r\nvar enemyArrival = 10;\r\nvar enemyArrivalTime = 10;\r\nvar enemyArrivalTimeSec = 10;\r\n\r\n// nazwa funkcji zbyt długa i nazwa dobra\r\nfunction generateEnemyBaseSpatialDistributionModel() {}\r\nfunction makeEnemyMap() {}\r\n\n\n\n\n\n// JAK PISAĆ KOMENTARZE\n// =====================================================\n//1) ---------------------------------------------------\n// Przykład komentarzy poprzedzających napisanie kodu\r\n// -------------------------------------------------------------------\r\n\r\n\r\n// utwórz mapę bazy sił Rebelii\r\n\r\n    // utwórz tabelkę html mapy\r\n\r\n    // utwórz tablicę oddziałów Rebelii\r\n\r\n    // ustaw liczebność oddziałów na mapie\r\n\r\n\r\n// oblicz punkt uderzenia z Gwiazdy Śmierci\r\n\r\n    // sprawdź stopień naładowania generatorów\r\n\r\n    // zsumuj poziom frustracji wszystkich Sithów i ich generałów\r\n\r\n    // oblicz trajektorię uderzenia w zależności od sumy energii\r\n\r\n\r\n// usuń rebeliantów z kwadratu, który ulegnie zniszczeniu\n\n\n//3) ---------------------------------------------------\n// (komentarz krótki: ) Kylo Ren niszczy 5 z 12 X-Wingów\r\n\r\n\r\n// (Komentarz długi: ) \r\n// Optymalizacjia reakcji Rebleiantów odbywa się w 3 krokach:\r\n//    1. utworzenie aktualnej mapy bazy sił Rebelii\r\n//    2. obliczenie punktu uderzenia z Gwiazdy Śmierci\r\n//    3. usunięcie sił z kwadratu, który ulegnie zniszczeniu\r\n//\r\n// UWAGA: poziom frustracji Sithów zmienia się losowo.	52
25	\N	hard	HTML - rusztowanie strony www	HTML - RUSZTOWANIE STRONY WWW\n=====================================================\n________________________________________________________\n1)\nWszystkie pudełka, z których zbudowana jest strona internetowa znajdują się w jednym, głównym. To pudełko nazwywa się "html".\r\n\r\nW nim znajdują się kolejne pudełka, a w nich kolejne - i tak coraz głębiej.\r\n\r\nTo główne pudełko jest dostępne w kodzie JavaScript jako zmienna globalna "document".\r\n\r\n(O tym co to jest zmienna globalna będziemy mówić dalej. Zapamiętaj tylko, że "document" jest zawsze dostępny w kodzie JavaScript - w każdym miejscu można go przywołać).\n\n\n________________________________________________________\n2)\nPodełka powkładane w pudełka można inaczej opisać jako drzewo:\r\n- jego korzeń to "html"\r\n- korzeń rozgałezia się na "head" i "body" (czyli zawiera je w sobie) \r\n- "body" rozgałęzia się na wiele elementów "div" (czyli zawiera je w sobie)\r\n- te rozgałęziają się na kolejne, coraz mniejsze, coraz głębiej w strukturze drzewa.\r\n\r\nTo drzewo nazywa się "DOM" - Document Object Model.\r\n\r\nElementy drzewa DOM to obiekty, które można odczytywać i zmieniać używając JavaScript.\n\n\n\n\nCEGIEŁKI DOM\n=====================================================\n________________________________________________________\n1)\nWszystkie pudełka buduje się tak samo - pisząc znaczniki html.\r\n\r\n"Znacznik html" to po angielsku "tag". Dalej będziemy używali słowa "tag".\r\n\r\nTag jest to słowo, które odczytane przez przeglądarkę powoduje, że buduje ona taki element jaki przypisany jest to tego tagu. \r\n\r\nPrzegladarka sama w sobie zawiera kod budujący każdy z możliwych tagów, dlatego programista pisze tylko sam tag i nie musi się martwić jak ma on zostać utworzony.\n\n\n________________________________________________________\n2)\nKażdy element DOM powstaje poprzez napisanie dwóch tagów :\r\n  1. tag początkowy - czyli nazwa pomiędzy znakami "<"   ">"\r\n  2. tag końcowy - czyli nazwa pomiędzy znakami "</"   ">"\r\n\r\nPrzykładowe tagi to:\r\n  <body>\r\n  <div>\r\n  <input>\r\n\r\nNiektóre elementy tworzy się bez tagu końcowego (np <input>).\n\n\n________________________________________________________\n3)\nWstawienie jednego elementu DOM do innego - czyli wstawienie pudełka do środka innnego pudełka - polega na:\r\n- wpisaniu tagów początku i końca wewnętrznego elementu...\r\n- ...pomiędzy tagi początku i końca zewnętrznego elementu.	// CEGIEŁKI DOM\n// =====================================================\n//2) ---------------------------------------------------\n<body>\r\n    <div>\r\n        <input type="button" value="Ok.">\r\n        <div>Tekst na mojej stronie</div>\r\n    </div>\r\n</body>\n\n\n//3) ---------------------------------------------------\n<div>\r\n    <div>Tekst na mojej stronie</div>\r\n</div>	25
66	\N	hard	Co to jest zmienna	CO TO JEST ZMIENNA\n=====================================================\n________________________________________________________\n1)\nZmienna to miejsce w pamięci komputera, w którym zapisujemy jakąś wartość.\r\n\r\nMoże to być liczba, albo tekst albo inne rodzaje danych.\n\n\n________________________________________________________\n2)\nAby używac zmiennej nadajemy jej nazwę. \r\n\r\nNazwa zmiennej powinna być przede wszystkim jednoznaczna - jasno mówić co przechowuje.\r\n\r\nRównoczesnie powinna być możliwie krótka  - to ułatwia rozumienie kodu.\r\n\r\n\r\nNazwa zmiennej często składa się z kilku słów.\r\n\r\nW JavaScript przyjęto styl "camelback" - tzn.: \r\n- nazwy zmiennych i funkcji piszemy małymi literami,\r\n- pierwsze słowo zaczynamy z małej, \r\n- każde kolejne słowo zaczynamy z dużej litery.\n\n\n\n\nWARTOŚĆ ZMIENNEJ\n=====================================================\n________________________________________________________\n1)\nW JavaScript zmienne deklaruje się używając słowa kluczowego "var".\r\n\r\nPo "var" podajemy nazwę zmiennej.\n\n\n________________________________________________________\n2)\nWartość zmiennej można jej przypisać:\r\n- albo w chwili jej utworzenia,\r\n- albo później.\r\n\r\nTa wartość zostaje zapisana w pamięci komputera.\r\n\r\nNastepnie można ją zmieniać, w miarę wykonywania dalszego kodu.	// CO TO JEST ZMIENNA\n// =====================================================\n//2) ---------------------------------------------------\nvar liczbaLekcji;\r\n\r\nvar i;\r\n\r\nvar maxLength;\r\n\r\nvar wartMojegoPortfelaPrzedWakac;\n\n\n\n\n// WARTOŚĆ ZMIENNEJ\n// =====================================================\n//1) ---------------------------------------------------\nvar boardSize;\n\n\n//2) ---------------------------------------------------\nvar boardSize = 5;\r\n\r\nvar riskLevel;\r\nvar playerScore;\r\nriskLevel =  2.3;	66
73	\N	hard	Typ i przypisanie wartości zmiennej	TYPY ZMIENNYCH\n=====================================================\n________________________________________________________\n1)\nUżywa się wielu typów zmiennych. Główny podział to typy proste i złożone.\r\n\r\nZmienne proste zawierają jeden element - np.: \r\n- liczbę,\r\n- tekst (string),\r\n- wartość logiczną : prawda ("true") lub fałsz ("false").\n\n\n________________________________________________________\n2)\nIstnieją wiele złożonych typów zmiennych .\r\n\r\nTyp złożony przechowuje wiele pojedynczych informacji - np wiele liczb, wiele tekstów (stringów).\r\n\r\nW czasie tego kursu będziemy wykorzystywali jeden z nich - tablice.\r\n(Nauczymy się używać tablic w dalszej części kursu.)\n\n\n\n\nPRZYPISANIE WARTOŚCI ZMIENNEJ\n=====================================================\n________________________________________________________\n1)\nWartośc można nadać zmiennej od razu przy jej tworzeniu. \r\n\r\nW takim przypadku po nazwie zmiennej piszemy znak "=" a dalej wartość i kończymy znakiem ";".\n\n\n________________________________________________________\n2)\nMożna też zmienną utworzyć na razie nie nadając jej żadnej wartości.\r\n\r\nWartość zostaje nadana później w trakcie wykonywania dalszych instrukcji programu.	// TYPY ZMIENNYCH\n// =====================================================\n//1) ---------------------------------------------------\nvar nPartsStarWars = 7;\r\n\r\nvar newVader = "Kylo Ren";\r\n\r\nvar deathStarPower = 8000001562.75;\r\n\r\nvar hanLikesLea = true;\n\n\n//2) ---------------------------------------------------\n// tablica\r\nvar millHawkCrew = ["Han Solo", "Chewbacca", "R2-D2", "C3PO"];\r\n\r\n// obiekt\r\nvar badGuys = {\r\n    cleverBoss: "Imperator", \r\n    complicatedOne: "Darth Vader", \r\n    nMaxSiths: 3\r\n};\n\n\n\n\n// PRZYPISANIE WARTOŚCI ZMIENNEJ\n// =====================================================\n//1) ---------------------------------------------------\nvar maxNPaczkow = 21;\n\n\n//2) ---------------------------------------------------\nvar maxNPaczkow;\r\nmaxNPaczkow = 21;	73
91	\N	hard	Operator, inkrementacja, dekrementacja	CO TO JEST OPERATOR\n=====================================================\n________________________________________________________\n1)\nOperator to znak lub para znaków które wydają polecenie wykonania jakiejś operacji na zmiennych.\r\n\r\nTe operacje to np: dodanie dwóch liczb, odejmowanie, łączenie stringów, porównanie wielkości (równe, większe, mniejsze, itd.).\r\n\r\nDla typu logicznego ("true", "false") używa się operatorów logicznych:\r\n- oraz:   "&&"\r\n- lub:   "||"\n\n\n________________________________________________________\n2)\nZnak "=", który widzieliśmy już wczesnie to operator przypisania. Przypisuje on wartość zmiennej.\n\n\n\n\nINKREMENTACJA, OPERATOR Z PRZYPISANIEM\n=====================================================\n________________________________________________________\n1)\nCzęsto korzysta się z operatorów łączących prostą operację z przypisaniem. \r\n\r\n\r\nTaki operator składa sie zawsze ze znaku operacji (lewy znak) oraz znaku przypisania (prawy znak).\r\n\r\n\r\nDziałanie operatora z przypisaniem:\r\n\r\n1. zmienna po lewej stronie operatora jest poddawana operacj z lewego znaku operatora\r\n\r\n2. a następnie od razu wynik tego działania zostaje zapisany tej samej zmiennej jako jej nowa wartość.\n\n\n________________________________________________________\n2)\nCzęsto korzysta się z operatorów inkrementacji ji dekrementacji.\r\n\r\n- inkrementacja - powiększenie liczby o 1, operator: "++"\r\n- dekrementacja - zmniejszenie liczby o 1,  operator: "--"\r\n\r\n\r\nInkrementacja i dekrementacja są powszechnie stosowane w pętlach, jak to zobaczymy dalej.	// CO TO JEST OPERATOR\n// =====================================================\n//1) ---------------------------------------------------\n/*\r\nprzykładowe operatory przypisania wartości\r\n=    przypisanie wartość\r\n+=    dodanie liczby lub dołączenie stringu\r\n*=    pomnożenie przez liczbę\r\n\r\nprzykładowe operatory matematyczne\r\n+    dodawanie\r\n-    odejmowanie\r\n*    mnożenie\r\n/    dzielenie\r\n\r\nprzykładowe operatory porównania\r\n===    równy\r\n!==    nierówny\r\n<    mniejszy\r\n>    większy\r\n<=    mniejszy lub równy\r\n>=    większy lub równy\r\n\r\nprzykładowe operatory logiczne\r\n&&    oraz\r\n||    lub\r\n!    zaprzeczenie (zmienia "true" w "false" i odwrotnie)\r\n\r\n*/\r\n\r\n// przykład zaprzeczenia\r\nvar uwielbiamSzkole = true;\r\nvar jakJest = !uwielbiamSzkole;\n\n\n//2) ---------------------------------------------------\nvar bestGame = "Lubię grać";\n\n\n\n\n// INKREMENTACJA, OPERATOR Z PRZYPISANIEM\n// =====================================================\n//1) ---------------------------------------------------\nvar bestGame = "Lubię grać w: "; \r\nbestGame += "Overwatch";\r\nbestGame += ", Wiedźmin.";\r\n\r\n// teraz bestGame ma wartość: \r\n"Lubię grać w: Overwatch, Wiedźmin."\r\n\r\n// --------------------------------------------------------\r\nvar wynik = 750;\r\nvar nGier = 30;\r\nwynik /= nGier;    // dzielimy wynik przez nGier i od razu zapamiętujemy uzyskaną wartość w zmiennej "wynik"\r\n\r\n// teraz wynik ma wartość:\r\n250\n\n\n//2) ---------------------------------------------------\n// najczęściej wykorzystuje sie inkrementację w pętli "for" \r\n\r\n\r\n// tu "i" rośnie przy każdym powtórzeniu\r\n\r\nfor(var i = 0; i < 5; i++ ) {\r\n    // tu nastepują instrukcje wewnątrz "for" \r\n    // mogą wykorzystać aktualną wartość "i"\r\n}\r\n\r\n\r\n\r\n// tu "i" maleje przy każdym powtórzeniu\r\n\r\nfor(var i = nReps; i > 0; i-- ) {\r\n    // tu nastepują instrukcje wewnątrz "for" \r\n    // mogą wykorzystać aktualną wartość "i"\r\n}	91
98	\N	hard	Co to jest tablica	CO TO JEST TABLICA\n=====================================================\n________________________________________________________\n1)\nTablica w programowaniu to zbiór wielu elementów tego samego typu.\r\n\r\nNp. zbiór wielu liczb lub wielu stringów.\n\n\n________________________________________________________\n2)\nElementy w tablicy są ponumerowane - każdy ma swój numer.\r\n\r\nNumer danego elementu w tablicy to jego "indeks".\r\n\r\nTablice są indeksowane od zera - tzn. pierwszy element ma indeks 0, drugi: 1, trzeci: 2, itd..\r\n\r\nDostęp do elementu tablicy otrzymujemy podając jego indeks w nawiasach kwadratowych po nazwie tablicy.\n\n\n\n\nUŻYWANIE TABLICY\n=====================================================\n________________________________________________________\n1)\nTablicę można utworzyć i następnie:\r\n- albo pozostawić pustą,\r\n- albo od razu wpisać do niej wartości,\r\n- albo przypisać wartości jej elementom później.\r\n\r\nTworząc pustą tablicę możemy od razu podać jej rozmiar - w nawiasach kwadratowych.\n\n\n________________________________________________________\n2)\nMożna utworzyć tablicę ze stringu, dzieląc go na części oddzielone wskazanym przez nas znakiem.\r\n\r\nSłuży do tego funkcja string.split.\n\n\n________________________________________________________\n3)\nElement tablicy jest po prostu zmienną, tyle, że zamiast unikalnej nazwy jej nazwą jest nazwa tablicy z podanym indeksem.\r\n\r\nElement uchwycony w ten sposób możemy odczytać lub do przypisać mu nową wartość.\n\n\n\n\nTABLICA DWUWYMIAROWA\n=====================================================\n________________________________________________________\n1)\nTablica dwuwymiarowa to po prostu zwykła tablica, tylko jej elementy również są tablicami.\r\n\r\nZapisujemy ją podając drugi nawias kwadratowy po pierwszym.\r\n\r\nW drugim nawiasie będziemy podawali indeksy tablicy, która jest elementem tablicy nadrzędnej (wskazanym w pierwszym nawiasie).\r\n\r\nDługość każdego z wymiarów tablicy może być różna.\n\n\n________________________________________________________\n2)\nTablicę dwuwymiarową tworzy się tak jak jednowymiarową pamiętając jedynie o drugim kwadratowym nawiasie.\n\n\n________________________________________________________\n3)\nDostęp do elementu również działa tak samo z jedyną różnicą, że teraz trzeba podać dwa indeksy:\r\n- indeks pierwszego wymiaru tablicy (w naszym przykładzie to ludzie)\r\n- indeks drugiego wymiaru (to już konkretne osoby).	// CO TO JEST TABLICA\n// =====================================================\n//1) ---------------------------------------------------\nvar millHawkCrew = ["Han Solo", "Chewbacca", "R2-D2", "C3PO"];\r\n\r\n\r\nvar money = [0.10, 0.20, 0.50, 1, 2, 5, 10, 50, 100];\n\n\n//2) ---------------------------------------------------\nvar badGuys = ["Imperator", "Darth Vader", "Kylo Ren"];\r\n\r\nvar youngestOne = badGuys[2];\n\n\n\n\n// UŻYWANIE TABLICY\n// =====================================================\n//1) ---------------------------------------------------\n// utworzyć i pozostawić pustą\r\nvar godGuys = [];\r\n\r\n\r\n// utworzyć i od razu wpisać do niej wartości\r\nvar goodGuys = ["Han Solo", "Luke", "R2D2"];\r\n\r\n\r\n// dodać nowe wartości do już istniejącej \r\nvar jedi = [3];\r\njedi[0] = "Yoda";\r\njedi[1] = "Obi-Wan";\r\njedi[2] = "Jar Jar Binks";\n\n\n//2) ---------------------------------------------------\nvar lodyRazem = "czeko-wani-trusk-orzech";\r\n\r\n// tablica powstanie po pozdzieleniu stringu na części \r\n// które oddziela w nim znak: "-" \r\nvar lody = lodyRazem.split("-");\r\nvar najlepsze = lody[0];\n\n\n//3) ---------------------------------------------------\nvar jedi = [3];\r\njedi[0] = "Yoda";\r\njedi[1] = "Obi-Wan";\r\njedi[2] = "Jar Jar Binks";\r\n\r\n// prostujemy okropną pomyłkę\r\njedi[2] = "Qui-Gon";\n\n\n\n\n// TABLICA DWUWYMIAROWA\n// =====================================================\n//1) ---------------------------------------------------\nvar peopleAndRobots = [2][3];\n\n\n//2) ---------------------------------------------------\nvar peopleAndRobots = [2];\r\npeopleAndRobots[0] = [3];\r\npeopleAndRobots[1] = [3];\r\n\r\npeopleAndRobots[0][0] = "Anakin";\r\npeopleAndRobots[0][1] = "Jabba";\r\npeopleAndRobots[0][2] = "Leia";\r\n\r\npeopleAndRobots[1][0] = "R2D2";\r\npeopleAndRobots[1][1] = "C3PO";\r\npeopleAndRobots[1][2] = "BB-8";\n\n\n//3) ---------------------------------------------------\nvar peopleAndRobots = [2];\r\npeopleAndRobots[0] = [3];\r\npeopleAndRobots[1] = [3];\r\n\r\npeopleAndRobots[0][1] = "Jabba";\r\n\r\n// znów pomyłka!\r\nvar myFavourite = peopleAndRobots[0][1];\r\n\r\n// poprawiamy\r\npeopleAndRobots[0][1] = "Kylo Ren";\r\n\r\n// hmm, na pewno?...\r\nmyFavourite = peopleAndRobots[0][1];	98
110	\N	hard	Warunki i pętle	INSTRUKCJA "IF"\n=====================================================\n________________________________________________________\n1)\nInstrukcja "if" sprawdza warunek, który podajemy w nawiasach.\r\n\r\nWarunek to może być: \r\n- zmienna, \r\n- lub instrukcja (bez średnika na końcu), która zwraca wartość "true" lub "false".\r\n- lub kilka zmiennych albo instrukcji połączonych operatorami logicznymi\n\n\n________________________________________________________\n2)\nInstrukcja "if" może zawierać wariant, który się wykona, gdy warunek nie jest spełniony.\r\n\r\nW tym celu dodajemy do drugi element : "else".\n\n\n________________________________________________________\n3)\nInstrukcja "if" może sprawdzać po kolei wiele warunków.\r\n\r\nKolejne warunki sprawdza się dodając element "if else" z jego warunkiem w nawiasach.\r\nElement "if else" trzeba dodać tyle razy ile jest kolejnych warunków do sprawdzenia.\r\n\r\nNa końcu można też dodać element "else", jeżeli jest potrzebny.\n\n\n\n\nPĘTLA "FOR"\n=====================================================\n________________________________________________________\n1)\nPętla "for" służy do wielokrotnego wykonania instrukcji, która znajduje się bezpośrednio za nią.\r\n\r\nMoże to być pojedyncza instrukcja lub blok instrukcji (w nawiasach klamrowych - o bloku instrukcji za chwilę).\n\n\n________________________________________________________\n2)\nPętlę "for" tworzy się :\r\n- pisząc słowo "for"\r\n- za nim nawiasy okrągłe\r\n- w tych nawiasach 3 krótkie instrukcje oddzielone 2 średnikami:\r\n    1. utworzenie iteratora (o nim za chwilę)\r\n    2. warunek przerwania pętli\r\n    3. instrukcja do wykonania po każdym obrocie pętli \n\n\n\n\nITERATOR I ZAGNIEŻDŻENIE "FOR"\n=====================================================\n________________________________________________________\n1)\n"Iterator" to liczba, która jest podnoszona o 1 po zakończeniu każdego obrotu pętli.\r\n\r\nMa 2 funkcje:\r\n- gdy przekroczy podaną wartość - pętla zostaje zakończona,\r\n- wewnątrz pętli może być wykorzystany jako zmienna.\n\n\n________________________________________________________\n2)\nPętle można umieszczać wewnątrz innych pętli.\r\n\r\nW tym celu po prostu jako instrukcję do wykonania wewnątrz "for" piszemy drugi "for".\r\n\r\nW każdym obrocie zewnętrznego "for" (w przykładzie są 2 takie obroty) wykona się cały wewnętrzny "for" (w przykładzie wywołuje swoją instrukcję 4 razy). W efekcie liczba wywołań instrukcji wewnętrznego "for" w przykładzie to iloczyn 2 i 4, czyli 8 razy.	// INSTRUKCJA "IF"\n// =====================================================\n//1) ---------------------------------------------------\nvar iloscCzeko = 3;\r\n\r\n\r\n// warunkiem "if" jest zmienna\r\nvar lubieLodyCzeko = true;\r\nif (lubieLodyCzeko)\r\n    iloscCzeko = iloscCzeko * 0.5;\r\n\r\n\r\n// warunek: instrukcja zwracająca "true" lub "false"\r\nvar liczbaGosci = 3;\r\nif (liczbaGosci > 1) \r\n    iloscCzeko = 0;\r\n\r\n\r\n// warunek: kilka elementów połączonych operatorami logicznymi\r\nif (lubieLodyCzeko && liczbaGosci > 0) \r\n    iloscCzeko = 0;\n\n\n//2) ---------------------------------------------------\nvar iloscCzeko = 3;\r\nvar iloscPizzy = 2;\r\n\r\n\r\nvar lubieLodyCzeko = true;\r\nif (lubieLodyCzeko)\r\n    iloscCzeko = iloscCzeko * 0.5;\r\nelse\r\n    iloscPizzy -= 1;\n\n\n//3) ---------------------------------------------------\nvar iloscCzeko = 3;\r\nvar iloscPizzy = 2;\r\n\r\nvar czujeGlod = 1;\r\nvar lubieLodyCzeko = false;\r\nvar lubiePizze = false;\r\n\r\nif (lubieLodyCzeko)\r\n    iloscCzeko = iloscCzeko * 0.5;\r\nelse if (lubiePizze)\r\n    iloscPizzy -= 1;\r\nelse\r\n    czujeGlod += 3;\n\n\n\n\n// PĘTLA "FOR"\n// =====================================================\n//2) ---------------------------------------------------\nvar imperatorMeetings = 20;\r\nvar anakinDarkSide = 0;\r\n\r\n\r\n// ciemna strona mocy Anakina rośnie po każdym \r\n// spotkaniu z Imperatorem\r\nfor (var i = 0; i < imperatorMeetings; i++) \r\n    anakinDarkSide += 25;\r\n\r\n// ZAGADKA:\r\n// Jak silna jest teraz Ciemna Strona w Anakinie?\n\n\n\n\n// ITERATOR I ZAGNIEŻDŻENIE "FOR"\n// =====================================================\n//1) ---------------------------------------------------\nvar znajomi =  ["Zdzisław", "Zenon", "Masa", "Rychu"];\r\nvar najnowszyZnajomy;\r\nvar listaGosci = "";\r\n\r\nfor (var i = 0; i < znajomi.length; i++) {\r\n    listaGosci += " - " + znajomi[i];\r\n    najnowszyZnajomy = znajomi[i];\r\n}\r\n\r\n// teraz zmienne mają takie wartości: \r\n//      listaGosci = "Zdzisław - Zenon - Masa - Rychu"\r\n//      najnowszyZnajomy = "Rychu"\n\n\n//2) ---------------------------------------------------\nvar znajomi =  ["Zdzisław", "Zenon", "Masa", "Rychu"];\r\nvar nieznajomi = ["Złotnik", "Biznesman", "Jubiler", "Bankier"];\r\nvar wszyscy = [znajomi, nieznajomi];\r\n\r\nvar listaGosci = "";\r\n\r\nfor (var i = 0; i < 2; i++) \r\n    for (var j = 0; j < 4; j++)\r\n        listaGosci += ", " + wszyscy[i][j];\r\n\r\n// ZAGADKA:\r\n// Kto jest pierwszy w utworzonym stringu - Masa czy Złotnik?\r\n// Jak zmienić ten podwójny "for", żeby zamienić kolejność tych dwóch\r\n// szacownych, praworządnych obywateli? (nie muszą sąsiadować)	110
121	\N	hard	Blok instrukcji, widoczność zmiennej	BLOK KILKU INSTRUKCJI\n=====================================================\n________________________________________________________\n1)\nJeżeli po spełnieniu jakiegoś warunku program ma wykonać jedną instrukcję to można ja podać po prostu w kolejnej linii. (O warunkach dowiesz się już kilka modułów dalej)\r\n\r\n\r\nJeżeli jednak ma on wykonać kilka instrukcji oraz ma ich wszystkich NIE wykonywać, jeśli warunek nie jest spełniony, to trzeba je zamknąć między nawiasami klamrowymi "{ ... }"\r\n\r\nInstrukcje umieszczone pomiędzy nawiasami tworzą "blok instrukcji".\r\n\r\nKod wewnątrz każdego bloku musi mieć większy odstęp od marginesu (być głębiej wcięty) niż kod, który go otacza. Wtedy taki kod jest czytelny.\n\n\n________________________________________________________\n2)\nZmienna utworzona wewnątrz bloku instrukcji będzie widoczna tylko wewnątrz tego bloku.\r\n\r\nCzęsto bloki umieszczane są wewnątrz innych bloków.\r\n\r\nZmienna utworzona wewnątrz bloku zawsze\r\n- jest widoczna w tym bloku \r\n- jest widoczna w blokach zagnieżdżonych w tym bloku,\r\n- NIE jest widoczna na zewnątrz tego bloku.\n\n\n\n\nZMIENNE GLOBALNE I LOKALNE\n=====================================================\n________________________________________________________\n1)\nZmienna może być dostępna w każdym miejscu kodu, lub tylko wewnątrz funkcji. (co to jest funkcja dowiesz się już za chwilę).\r\n\r\nMówimy wtedy, że zmienna ma "zakres widoczności globalny" lub "zakres widoczności lokalny".\r\n\r\nAby zmienna miała globalny zakres (widoczności) trzeba ją utworzyć poza funkcją.\n\n\n________________________________________________________\n2)\nUWAGA: w JavaScript zmienną można utworzyć podając tylko jej nazwę - bez słowa "var".\r\n\r\nTaka zmienna ma zakres globalny.\r\n\r\nNIGDY nie używaj tej możliwości, ponieważ może prowadzić do nieprzewidzianych efektów twojego kodu - twórz zmienne używając "var".	// BLOK KILKU INSTRUKCJI\n// =====================================================\n//1) ---------------------------------------------------\nvar marekLubiBulki = false;\r\nvar liczbaBulek = 4;\r\nvar marekZjadl;\r\n\r\n\r\n// Wersja 1. pojedyncza instrukcja zależna od warunku\r\n// ----------------------------------------------------\r\nif (marekLubiBulki === true) \r\n    liczbaBulek = 8;\r\n\r\nmarekZjadl = 4;\r\n\r\n// ile więc bułek zostanie dla mnie?\r\nvar mogeZjesc = liczbaBulek - marekZjadl;\r\n\r\n\r\n\r\n// Wersja 2. blok instrukcji  zależny od warunku\r\n// ----------------------------------------------------\r\n// jeśli Marek nie lubi bułek to dla mnie zostaną 4.\r\nif (marekLubiBulki === true) {\r\n    liczbaBulek = 8;\r\n    marekZjadl = 4;\r\n}\r\n\r\nvar mogeZjesc = liczbaBulek - marekZjadl;\n\n\n//2) ---------------------------------------------------\nvar marekLubiBulki = true;\r\nvar liczbaBulek = 4;\r\n\r\nif (marekLubiBulki === true) {\r\n    liczbaBulek = 8;\r\n    var marekZjadl = 4; // tworzymy zmienną WEWNĄTRZ bloku\r\n}\r\n\r\n// BŁĄD - zmienna "marekZjadl" nie jest tu widoczna\r\nvar mogeZjesc = liczbaBulek - marekZjadl;   \r\n\n\n\n\n\n// ZMIENNE GLOBALNE I LOKALNE\n// =====================================================\n//1) ---------------------------------------------------\nvar globalVar = 5;\r\n\r\nfunction mojaFunkcja() {\r\n    var localVar = 3;\r\n}\r\n\r\nvar total = globalVar + localVar;\r\n// BŁĄD zmienna local nie jest tu widoczna	121
128	\N	hard	Funkcje	FUNKCJE\n=====================================================\n________________________________________________________\n1)\nFunkcja to fragment kodu, w którym jest jedna lub więcej instrukcji.\r\n\r\nFunkcję tworzy się pisząc \r\n- słowo "function" \r\n- po nim nazwę funkcji\r\n- potem zmknięte nawiasy "()"\r\n- potem nawiasy klamrowe, między którymi umieszcza się instrukcje funkcji\n\n\n________________________________________________________\n2)\n1. Funkcję pisze się tylko raz, a można ją wywołać wielokrotnie, w różnych miejscach kodu.\r\n\r\n2. Nazwa funkcji mówi, co ta funkcja robi. Dzięki temu, gdy w kodzie jakiś fragment zastąpi się funkcją to kod staje się bardziej czytelny.\n\n\n\n\nUTWORZENIE I WYKORZYSTANIE FUNKCJI\n=====================================================\n________________________________________________________\n1)\nDo funkcji można przekazać argumenty.\r\n\r\n"Argument" funkcji to zmienna, która zostanie wykorzystana przez instrukcje funkcji.\r\n\r\nArgumenty podaje się w nawiasach za nazwą funkcji.\r\nJeśli argumentów jest wiele - oddziela się je przecinkami.\n\n\n________________________________________________________\n2)\nFunkcję wywołuje się podając jej nazwę.\r\n\r\nJeśli pobiera ona jakieś argumenty to podaje się je w nawiasach po nazwie, oddzielając przecinkami.\n\n\n\n\nUŻYWANIE FUNKCJI\n=====================================================\n________________________________________________________\n1)\nFunkcja może wykonać operacje na zmiennych globalnych. Po jej wykonaniu mają one inne wartości niż przedtem.\n\n\n________________________________________________________\n2)\nFunkcja może też tworzyć i oddawać jakiś wynik w postaci danych. \r\n\r\nAby funkcja coś zwracała trzeba użyć słowa "return" i po nim podać to, co funkcja zwraca.\r\n\r\nWynik funkcji może mieć dowolny typ: liczba, string, typ logiczny, itd..	// FUNKCJE\n// =====================================================\n//1) ---------------------------------------------------\nvar empireShips = 120;\r\nvar hawkFullyArmed = true;\r\n\r\n\r\n// Millenium Hawk niszczy część floty Imperium\r\nfunction millHawkAttack() {\r\n    if (hawkFullyArmed === true)\r\n        empireShips = empireShips * 0.3;\r\n    else\r\n        empireShips = empireShips * 0.8;\r\n}\n\n\n\n\n// UTWORZENIE I WYKORZYSTANIE FUNKCJI\n// =====================================================\n//1) ---------------------------------------------------\nvar empireShips = 120;\r\n\r\n// Millenium Hawk niszczy część floty Imperium\r\nfunction millHawkAttack(hawkFullyArmed, battleLength) {\r\n    if (hawkFullyArmed === true)\r\n        empireShips = empireShips - 5 * battleLength;\r\n    else\r\n        empireShips = empireShips - 2 * battleLength;\r\n}\n\n\n//2) ---------------------------------------------------\nvar empireShips = 120;\r\nvar bountyHunterShips = 15;\r\n\r\n// Millenium Hawk niszczy część floty Imperium\r\n// battleLength : czas bitwy w minutach\r\nfunction millHawkAttack(hawkFullyArmed, battleLength) {\r\n    if (hawkFullyArmed === true)\r\n        empireShips = empireShips - 5 * battleLength;\r\n    else\r\n        empireShips = empireShips - 2 * battleLength;\r\n}\r\n\r\nmillHawkAttack(true, 10);\r\n\r\nvar enemyStrength = empireShips + bountyHunterShips;\n\n\n\n\n// UŻYWANIE FUNKCJI\n// =====================================================\n//1) ---------------------------------------------------\nvar zostaloPizzySzt = 2;\r\nvar jestemGlodny = true;\r\nvar czujeSieSwietnie = 8;\r\n\r\n\r\nfunction jemPizze(tyleZjadlem) {\r\n    zostaloPizzySzt -= tyleZjadlem;\r\n    \r\n    if (tyleZjadlem >= 1)\r\n        jestemGlodny = false;\r\n\r\n    // moje samopoczucie spada, jeśli zjadłem za dużo\r\n    var zLakomstwa = tyleZjadlem - 1;\r\n    if (zLakomstwa > 0)\r\n        czujeSieSwietnie -= zLakomstwa * 2;\r\n}\n\n\n//2) ---------------------------------------------------\nvar jestemGlodny = true;\r\nvar czujeSieSwietnie = 8;\r\n\r\n\r\nfunction jemPizze(pizzaSzt, tyleZjadlem) {\r\n    if (tyleZjadlem >= 1)\r\n        jestemGlodny = false;\r\n\r\n    // moje samopoczucie spada, jeśli zjadłem za dużo\r\n    var zLakomstwa = tyleZjadlem - 1;\r\n    if (zLakomstwa > 0)\r\n        czujeSieSwietnie -= zLakomstwa * 3;\r\n    \r\n    return PizzaSzt - tyleZjadlem;\r\n}\r\n\r\nvar zostaloPizzySzt = jemPizze(2, 1.5);\r\n	128
138	\N	hard	Dostęp do elementu DOM w JavaScript	POBRANIE REFERENCJI DO ELEMENTU\n=====================================================\n________________________________________________________\n1)\nJavaScript może dodawać, usuwać, zmieniać elementy DOM.\r\n\r\nAby wpływać na istniejący element kod JavaScript musi utworzyć referencję do tego elementu.\r\n\r\n"Referencja" to zmienna, która przechowuje ten element.\r\n\r\nRerefencję do elementu DOM uzyskuje się funkcją GetElementById(), której atrybutem jest "id" tego elementu.\r\n\r\nJest to funkcja elementu "document" - czyli korzenia drzewa DOM (głównego elementu strony, do którego powkładane są wszystkie inne.).\r\n\r\n(Wszystkie pudełka, z których zbudowana jest strona internetowa znajdują się w jednym, głównym. To pudełko nazwywa się "html". W nim znajdują się kolejne pudełka, a w nich kolejne - i tak coraz głębiej. To główne pudełko dla kodu JavaScript jest dostępne jako zmienna globalna "document".)\r\n\n\n\n________________________________________________________\n2)\nWewnątrz tagu <div> można umieścić:\r\n- tekst,\r\n- inne elementy DOM.\r\n\r\nInne elementy umieszcza się wpisując tam tekst który jest kodem HTML.\r\n\r\nUstawienie tekstu dla <div> wykonuje się w JavaScript przypisując wartość atrybutowi "innerHTML".\n\n\n\n\nTWORZENIE ELEMENTÓW DOM W JAVASCRIPT\n=====================================================\n________________________________________________________\n1)\nJeden z elementów HTML to tabelka z wierszami.\r\n\r\nTagi do utworzenia tabelki to:\r\n<table></table> : pudełko z tabelką w środku\r\n<tr></tr>  : jeden wiersz tabelki\r\n<td></td>  : jedna komórka wiersza\n\n\n________________________________________________________\n2)\nAby wstawić tabelkę do <div> możemy\r\n1. utworzyć string z jej kodem HTML\r\n2. wstawić ten tekst do naszego <div>	// POBRANIE REFERENCJI DO ELEMENTU\n// =====================================================\n//1) ---------------------------------------------------\nvar przyciskAkcja = document.GetEllementById("przycAkcja");\n\n\n//2) ---------------------------------------------------\n<div>Dark Side of The Force Always Prevails...</div>\r\n\r\n<div id="empireFleet"></div>\r\n\r\n<script>\r\n    var divEmpFleet = document.GetElementById("empireFleet"); \r\n    divEmpFleet.innerHTML = 120;\r\n</script>\n\n\n\n\n// TWORZENIE ELEMENTÓW DOM W JAVASCRIPT\n// =====================================================\n//1) ---------------------------------------------------\n<-- tworzymy czarno-białą szachownicę z 4 pól -->\r\n<table>\r\n    <tr>\r\n        <td>białe</td>\r\n        <td>czarne</td>\r\n    </tr>\r\n    <tr>\r\n        <td>czarne</td>\r\n        <td>białe</td>\r\n    </tr>\r\n</table>\n\n\n//2) ---------------------------------------------------\n// tworzymy zmienną, w której znajdzie się kod HTML tabelki\r\nvar htmlTabelki = "<table>";\r\n\r\n\r\n// w pętli "for" tworzymy wiersze…\r\n// a w nich w wewnętrznej pętli "for" tworzymy komórki wierszy\r\nfor (var row = 0; row < 2; row++) {\r\n\r\n   htmlTabelki += "<tr>";\r\n\r\n    for (var column = 0; column < 2; column++)\r\n        htmlTabelk += "<td></td>";\r\n\r\n    htmlTabelki += "</tr>";\r\n}\r\n\r\n\r\n// wstawiamy gotowy kod HTML do <div>\r\nvar divSzachy = document.GetElementById("szachy");\r\ndivSzachy.innerHTML = kodTabelki;	138
145	\N	hard	Manipulowanie elementem DOM w JavaScript	POBRANIE I WYKORZYSTANIE WARTOŚCI INPUT\n=====================================================\n________________________________________________________\n1)\nElement "input" typu "text" pozwala użytkownikowi wpisać tekst.\r\n\r\nMożna tam wpisać np. liczbę.\r\n\r\nTaki tekst można potem pobrać w JavaScript odczytując atrybut "value" tego elementu "input".\n\n\n________________________________________________________\n2)\nMożemy przechowywać dane wszystkich pól naszej tabelki w osobnej tablicy.\r\nTo daje nam wygodną możliwość manipulowania tymi danymi.\r\n\r\nTę tablicę możemy wypełnić danymi w takiej samej podwójnej pętli.\r\nW grze "Saper" pola mają wartość "1" lub "0" = "mina" lub "czysto".\r\n\r\n\r\n("Math.random() " tworzy liczbę losową pomiędzy 0 a 1.\r\nZAGADKA: jakich pól będzie więcej w naszej tablicy - zaminowanych czy czystych?)\n\n\n\n\nMODYFIKACJA ELEMENTU\n=====================================================\n________________________________________________________\n1)\nJednym z atrybutów dlementu DOM jest tablica jego klas CSS.\r\n\r\nTen trybut ma nazwę : "classList".\r\n\r\n"Klasa CSS" to zbiór ustawień wyglądu elementu posiadający swoją nazwę.\r\n\r\nElement może mieć wiele klas CSS w swoim "classList".\n\n\n________________________________________________________\n2)\nKlasy CSS można dodawać do elemenu funkcją JavaScript  add().\r\n\r\nPrzykład pokazuje również drugi mechanizm - w JavaScript można wywoływać kolejne polecenia oddzielając je tylko kropkami. Np. tutaj w jednej linii wykonuje się:\r\n  1. pobranie referencji do elementu \r\n  2. pobranie atrybutu "classList" tego elementu\r\n  3. dodanie do "classList" klasy "loaded"	// POBRANIE I WYKORZYSTANIE WARTOŚCI INPUT\n// =====================================================\n//1) ---------------------------------------------------\n<input id="mineFieldSize" type="text">\r\n\r\n<script>\r\n    var textSize = document.GetElementById("mineFieldSize");\r\n    var size = textSize.value;\r\n</script>\n\n\n//2) ---------------------------------------------------\n// tworzymy tablicę danych\r\nvar board = [2][2];\r\n\r\n\r\n// w podówjnej pętli "for" wpisujemy dane tablicy\r\nfor (var row = 0; row < 2; row++)\r\n    for (var column = 0; column < 2; column++)\r\n        if (Math.random() < 0.2)\r\n            board[row][column] = 1;\r\n        else\r\n            board[row][column] = 0;\r\n\n\n\n\n\n// MODYFIKACJA ELEMENTU\n// =====================================================\n//2) ---------------------------------------------------\n<div id="singleField">\r\n\r\n<script>\r\n    document.GetElementById("singleField").classList.add("loaded");\r\n</script>	145
152	\N	hard	Eventy = akcja na kliknięcie	ZDARZENIE (EVENT)\n=====================================================\n________________________________________________________\n1)\n"Event" w JavaScript reprezentuje pojedyncze zdarzenie w przeglądarce. \r\n\r\nTakim zdarzeniem może być:\r\n- kliknięcie elementu lewym przyciskiem myszy,\r\n- kliknięcie elementu prawym przyciskiem myszy,\r\n- zakończenie ładowania strony przez przeglądarkę,\r\n- i wiele innych.\n\n\n________________________________________________________\n2)\nEvent w istocie jest obiektem, który posiada swoje atrybuty. \r\n\r\nWśród tych atrybutów znajdują się:\r\n- obiekt, który ten event wywołał (np okreslony przycisk),\r\n- obiekty, które mają zareagować na wywołanie tego eventu (jedna lub wiele funkcji),\r\n- sposób wywołania - np czy to lewy czy prawy przycisk myszy.\r\n\r\nWywołanie eventu powoduje wywołanie wszystkich funkcji, które mają na niego zareagować. Otrzymują go i mogą odczytać jego atrybuty.\n\n\n\n\nDODANIE AKCJI DO ELEMENTU\n=====================================================\n________________________________________________________\n1)\nEvent "click" to event wywoływany w chwilli kliknięcia danego elementu lewym przyciskiem myszy.\r\n\r\nDopóki nie przypiszemy mu żadnej funkcji to kliknięcie nie spowoduje żadnej reakcji.\r\n\r\nReakcja pojawi się po kliknięciu gdy przypiszemy mu funkcję JavaScript.\n\n\n________________________________________________________\n2)\nDo elementu, który nie jest przyciskiem można też dodać akcję na event "click".\r\n\r\nDo tego celu służy funkcja "AddEventListener("click", ...)"\n\n\n\n\nWYKORZYSTANIE EVENTU\n=====================================================\n________________________________________________________\n1)\nFunkcja wywoływana przez event może odczytać jego atrybuty.\r\n\r\nW tym celu należy umieścić referencję do tego eventu jako jej pierwszy argument.\r\nWystarczy podać tam jakąkolwiek nazwę, dla tego eventu - np. "e".\n\n\n________________________________________________________\n2)\nOtrzymawszy referencję do eventu można odczytać jego atrybuty i wykorzystac je.\r\n\r\nŹródło eventu znajduje się w jego atrybucie "target". \r\nTym źródłem jest po prostu element DOM, który go wywołał - div, input, itd. \r\n\r\nMając ten element można odczytać jego atrybuty. \r\nNp. można odczytać jego "id".\n\n\n\n\nEVENT "CONTEXTMENU"\n=====================================================\n________________________________________________________\n1)\nEvent "contextmenu" to po prostu event wywoływany prawym przyciskiem myszy.\r\n\r\nDodaje się go do elementu tak samo jak inne.\n\n\n________________________________________________________\n2)\nJednak przeglądarka ma na stałe ustawioną domyślną akcję na prawy przycisk myszy. Jest to otwarcie menu kontekstowego.\r\n\r\nJeśli chcemy tę akcję wyłączyć należy użyć funkcji "preventDefault".	// DODANIE AKCJI DO ELEMENTU\n// =====================================================\n//1) ---------------------------------------------------\n<-- ten przycisk nic nie robi -->\r\n<input type="button" value="Feeble attack">\r\n\r\n\r\n<-- ten przycisk otwiera piekło dla Imperium -->\r\n<input type="button" value="FireAndFury"  click="millHawkAttack()">\r\n\n\n\n//2) ---------------------------------------------------\n<-- Na razie nikt nie bierze Jar Jara pod uwagę -->\r\n<div id="JarJar">Jar Jar is never what you expect.</div>\r\n\r\n<script>\r\n    // teraz nabiorą do niego respektu!\r\n    var butJarJar = document.GetElementById("JarJar");\r\n    butJarJar.addEventListener("click", blowTheGenerator);\r\n</script>\n\n\n\n\n// WYKORZYSTANIE EVENTU\n// =====================================================\n//1) ---------------------------------------------------\nfunction blowTheGenerator(e) {\r\n    \r\n}\n\n\n//2) ---------------------------------------------------\nfunction blowTheGenerator(e) {\r\n    var przycisk = e.target;\r\n    var whoDidThis = przycisk.id;\r\n\r\n    if (whoDidThis === "JarJar")\r\n        return "Oh no! Not HIM again! Aaaaaaaah…!";\r\n    else\r\n        return "HA! We have been expecting you…";\r\n}\n\n\n\n\n// EVENT "CONTEXTMENU"\n// =====================================================\n//1) ---------------------------------------------------\n<-- Teraz Jar Jar już powinien uważać  -->\r\n<div id="JarJar">Jar Jar is never what you expect.</div>\r\n\r\n<script>\r\n    // .. musimy mu dać nową umiejętność\r\n    var butJarJar = document.GetElementById("JarJar");\r\n    butJarJar.addEventListener("contextemu", teleportElsewhere);\r\n</script>\n\n\n//2) ---------------------------------------------------\nfunction blowTheGenerator(e) {\r\n    // wyłączamy domyślną akcję prawego przycisku myszy\r\n    e.preventDefault();    \r\n\r\n    // teraz menu kontekstowe już się nie otworzy\r\n    // możemy wykonywać naszą akcję dla prawdgo przycisku\r\n}	152
33	\N	hard	Dokument HTML	3 GŁÓWNE PUDEŁKA\n=====================================================\n________________________________________________________\n1)\nWszystkie pudełka, z których zbudowana jest strona internetowa znajdują się w jednym, głównym pudełku - jego tag to <html>.\r\n\r\nPudełko <html></html> rozciąga się na całe okno przeglądarki.\n\n\n________________________________________________________\n2)\nW pudełku "html" znajdują się 2 pudełka zawierające 2 główne składniki strony: \r\n- pudełko "head" (nie będziemy się nim tu zajmowali),\r\n- pudełko "body" - tu znajduje się wszystko co widzisz na stronie internetowej.\n\n\n\n\nTAGI <DIV> ORAZ <INPUT>\n=====================================================\n________________________________________________________\n1)\nTag <div> jest najczęściej stosowany.\r\n\r\nTworzy on pudełko, do którego wkłada się kolejne div-y lub inne elementy DOM.\n\n\n________________________________________________________\n2)\nTag <input> służy do wpisywania danych i wywoływania akcji na stronie.\r\n\r\nWystępuje w kilku typach. Dwa z nich to:\r\n- type="text"   : tworzy pole tekstowe, w które można wpisać liczbę lub tekst\r\n- type="button"  : tworzy przycisk do którego można przypisać funkcję JavaScript\n\n\n________________________________________________________\n3)\nTag <script> tworzy miejsce, w którym umieszcza się kod JavaScript.\r\n\r\nMożna go umieścić w "body".\r\n\r\nWewnątrz pisze się kod JavaScript, który ma działać na tej stronie internetowej.\r\n\r\n(Jeśli kod JavaScript jest dłuższy, to umieszcza się go w osobnych plikach z rozszerzeniem .js. Te pliki importuje się do HTML umieszczając ich adresy w elemencie "script" umieszczonym w "head". Ale w tym kursie my umieścimy Twój kod w elemencie "script" tak, żeby działał.)\n\n\n\n\nATRYBUT ELEMENTU DOM\n=====================================================\n________________________________________________________\n1)\n"Atrybut" elementu DOM to jakaś jego właściwość, którą może ustawić i odczytać programista.\r\n\r\nAtrybuty ustawia się wewnątrz tagu - za znakiem "<" oraz nazwą tagu, a przed znakiem ">".\r\n\r\nOddziela się je od nazwy tagu oraz od siebie nawzajem pojedynczą spacją.\n\n\n________________________________________________________\n2)\nAtrybut "id" elementu to jego identyfikator.\r\n\r\nMusi on być unikalny - jedyny taki w całym drzewie DOM.\r\n\r\nElementy drzewa DOM to obiekty - osobne fragmenty strony. Ich atrybuty można odczytywać i zmieniać. Atrybut "id" pozwala odnaleźć dany element w drzewie DOM. Dlatego "id" musi być unikalne.\n\n\n________________________________________________________\n3)\nElement <input> wymaga kilku atrybutów aby działał:\r\n- atrybut "type": "button" utworzy przycisk, "text" utworzy pole tekstowe\r\n- atrybut "value": ustawia tekst wyświetlany w tym elemencie\r\n- atrybut "click": ustawia funkcję JavaScript, którą uruchomi kliknięcie	// 3 GŁÓWNE PUDEŁKA\n// =====================================================\n//2) ---------------------------------------------------\n<html>\r\n\r\n    <head>\r\n    </head>\r\n\r\n    <body>\r\n        <div>\r\n            ….\r\n        </div>\r\n    </body>\r\n\r\n</html>\n\n\n\n\n// TAGI <DIV> ORAZ <INPUT>\n// =====================================================\n//1) ---------------------------------------------------\n<div>\r\n\r\n</div>\n\n\n//2) ---------------------------------------------------\n<input type="text" id="textFigthLength">\r\n\r\n<input type="button" value="Atakuj"  click="millHawkAttack()">\r\n\n\n\n//3) ---------------------------------------------------\n<script>\r\n    function countTheEnemy() {\r\n        var empireFleet = 210;\r\n        var bountyHunters = 15;\r\n        return empireFleet + bountyHunters;\r\n    }\r\n</script>\n\n\n\n\n// ATRYBUT ELEMENTU DOM\n// =====================================================\n//1) ---------------------------------------------------\n<div id="planAkcji">\r\n    ….\r\n   <input type="button" value="Atakuj"  click="millHawkAttack()">\r\n    ….\r\n</div>\r\n\n\n\n//2) ---------------------------------------------------\n<div id="divPrzyciskiAkcja">\r\n    ….\r\n   <input id="przycAtak">\r\n   <input id="przycHipernaped">\r\n    ….\r\n</div>\r\n\n\n\n//3) ---------------------------------------------------\n   <input id="przycAtak" type="button" value="Atakuj">\r\n	33
1	\N	hard	Przedmiot tego kursu	PRZEDMIOT TEGO KURSU\n=====================================================\n________________________________________________________\n1)\nCelem tego kursu jest nauczenie niektórych podstawowych elementów programowania w takim zakresie, jaki umożliwia napisanie:\r\n- prostej strony internetowej w HTML,\r\n- działającego na tej stronie programu w JavaScript..\r\n\r\nOpanowanie tych elementów otwiera drogę do programowania w innych językach, ponieważ sposób myślenia programistycznego i pojęcia są tam takie sam lub bardzo podobne.\r\n\r\nUWAGA: dla uproszczenia podajemy tu podstawowe zasady i narzędzia języka programowania nie zaznaczajac które są właściwe tylko dla JavaScript. Większość z nich jest jednak uniwersalna dla wszystkich języków. Tam gdzie nie jest - oszczędzamy tu użytkownikowi wchodzenia w szczegóły, zakładając, że jeśli zainteresuje się programowaniem to pozna szczegóły innych języków w swoim dalszym rozwoju.\n\n\n________________________________________________________\n2)\nZakres tego kursu jest mały po to, żeby umożliwić wejście w świat programowania w możliwie łatwy sposób.\r\n\r\nNie uczymy tu w szczególności CSS, który jest potrzebny do tworzenia stron internetowych. \r\nAby opanować go w podstawowym zakresie potrzebny jest jednak znacznie krótszy kurs niż ten.\r\nNa dodatek zrozumienie czym jest strona internetowa, które umożliwiamy tutaj, ułatwia zrozumienie CSS.		1
5	\N	hard	Program komputerowy	KOD PROGRAMU\n=====================================================\n________________________________________________________\n1)\nKod każdego programu to po prostu tekst.\r\n\r\nTen tekst musi być napisany w określonym języku programowania.\r\n\r\n"Język programowania" to:\r\n- zestaw słów, pod którymi kryją się ściśle określone serie komend procesora\r\n- składnia - czyli kolejność słów, nawiasy, średniki, itd. niezbędne dla zrozumienia kodu przez kompilator.\n\n\n________________________________________________________\n2)\nKod może znajdować się w jednym pliku lub w wielu plikach umieszczonych w wielu katalogach.\r\n\r\nKod strony internetowej jest tworzony w 2 lub w 3 językach, z których każdy odpowiada za inny aspekt strony (wyjaśniamy to dalej). Wszystkie trzy składniki mogą być umieszczone w jednym pliku. Ale mogą też być umieszczone w wielu osobnych plikach.\n\n\n________________________________________________________\n3)\nKomputer umie przetłumaczyć słowo zrozumiałe dla człowieka (słowo danego języka programowania) na serię komend dla procesora.\r\n\r\nProgramista nie musi wiedzieć jakie to komendy. Tłumaczeniem zajmuje się kompilator.\r\n\r\nAby wykonać program komputer:\r\n- uruchamia kompilator\r\n- kompilator tłumaczy tekst kodu ("kod źródłowy") na komendy dla procesora\r\n- komputer wykonuje skompilowane komendy - teraz są już zrozumiałe dla procesora.\n\n\n\n\nJAK SIĘ PISZE PROGRAM\n=====================================================\n________________________________________________________\n1)\nProgram pisze się tworząc kolejne instrukcje. \r\n\r\nInstrukcje grupowane są w funkcjach. \r\n\r\nFunkcje mogą być umieszczone w kodzie w dowolnej kolejności.\r\n\r\n(Co to jest instrukcja i funkcja dowiesz się w dalszej części kursu).\n\n\n________________________________________________________\n2)\nWewnątrz funkcji instrukcje są wykonywane w takiej kolejności jak zostały napisane.\r\n\r\nJeżeli w danej instrukcji wywołuje się inną funkcję - program przechodzi do niej, jest ona wykonywana, po czym program wraca do funkcji macierzystej i wykonuje jej nastepną linię kodu.\n\n\n\n\nŚRODOWISKO PROGRAMISTYCZNE\n=====================================================\n________________________________________________________\n1)\nProgramy pisze się przy użyciu innych programów, specjalnie zbudowanych do pisania programów. ... :)\r\n\r\nProgram do pisania programów to IDE, czyli Integrated Development Environment.\r\n(Dlatego taki program programiści określają mianem "środowisko" - environment).\n\n\n________________________________________________________\n2)\nIDE bardzo ułatwia pracę.\r\n\r\nDo tworzenia stron internetowych można użyć np. darmowego środowiska NetBeans.\r\n\r\nTworząc nowy projekt typu "strona www" NetBeans automatycznie tworzy strukturę strony oddając gotowy szkielet do wypełnienia użytkownikowi. Generuje "html", "head" i "body", wypełnia "head" niezbędnym minimum wpisów. (O tych elementach strony mówimy w nieco dalej.)\n\n\n________________________________________________________\n3)\nIDE wskazuje błędy w kodzie i daje wskazówki na czym polegają.\r\n\r\nKoloruje tekst ułatwiając rozróżnienie słów kluczowych, zmiennych, stringów itd.\r\n\r\nAutomatycznie formatuje tekst poprawiając jego czytelność.\r\n\r\nI oferuje wiele innych funkcji ułatwiających tworzenie kodu.\r\n\r\n(Edytor kodu dla użytkownika w tym kursie również posiada nieco takich funkcji.)		5
17	\N	hard	Co to jest strona internetowa	CO TO JEST STRONA INTERNETOWA\n=====================================================\n________________________________________________________\n1)\n"Strona internetowa" to jeden lub więcej plików tekstowych.\r\n\r\nTekst w tych plikach to kod trzech rodzajów: HTML, CSS i JavaScript. (Wyjaśnimy je za chwilę.)\n\n\n________________________________________________________\n2)\nPliki strony są pobierane na Twój komputer przez przeglądarkę.\r\n\r\nPrzeglądarka to po prostu program komputerowy, który umie :\r\n- pobrać dane z Internetu,\r\n- wykonać otrzymany kod HTML, CSS i JavaScript,\r\n- wyświetlić w swoim oknie wynik wykonania tego kodu.\n\n\n\n\n3 SKŁADNIKI STRONY INTERNETOWEJ\n=====================================================\n________________________________________________________\n1)\nHTML to język, który buduje szkielet strony. \r\n\r\nSzkielet strony można porównać do wielu pudełek powkładanych jedne w drugie. Aby utworzyć te pudełka i przydzielić im miejsce - pisze się HTML. Jedno takie pudełko to prostokąt wydzielony na ekranie. Strona to wiele coraz mniejszych prostokątów w innych prostokątach.\r\n\r\nKod HTML to jednoznaczna instrukcja dla przeglądarki z czego i jak zbudować stronę. To taka sama instrukcja jak instrukcja składania mebla albo zestawu LEGO. Jedyna różnica to ta, że przeglądarka sama na miejscu wytwarza potrzebne elementy.\n\n\n________________________________________________________\n2)\nKod CSS ustawia wygląd wszystkich pudełek strony www.\r\n\r\nW ramach tego kursu nie będziemy się nim zajmowali. \r\n\r\n(Ćwiczenia przygotowane dalej otrzymują gotowy kod CSS.)\n\n\n________________________________________________________\n3)\nJavaScript to język, bez którego strona po wczytaniu pozostawałaby zawsze nie zmieniona i oprócz linków do innych adresów nic innego by na niej nie działało.\r\n\r\nW JavaScript napisane są procedury, które ożywiają stronę\r\n- działają przyciski,\r\n- można coś wpisać do pól formularzy i to wpływa na dalsze akcje,\r\n- strona zmienia wygląd.		17
6	5	medium	Kod programu	________________________________________________________\n1)\nKod każdego programu to po prostu tekst.\r\n\r\nTen tekst musi być napisany w określonym języku programowania.\r\n\r\n"Język programowania" to:\r\n- zestaw słów, pod którymi kryją się ściśle określone serie komend procesora\r\n- składnia - czyli kolejność słów, nawiasy, średniki, itd. niezbędne dla zrozumienia kodu przez kompilator.\n\n\n________________________________________________________\n2)\nKod może znajdować się w jednym pliku lub w wielu plikach umieszczonych w wielu katalogach.\r\n\r\nKod strony internetowej jest tworzony w 2 lub w 3 językach, z których każdy odpowiada za inny aspekt strony (wyjaśniamy to dalej). Wszystkie trzy składniki mogą być umieszczone w jednym pliku. Ale mogą też być umieszczone w wielu osobnych plikach.\n\n\n________________________________________________________\n3)\nKomputer umie przetłumaczyć słowo zrozumiałe dla człowieka (słowo danego języka programowania) na serię komend dla procesora.\r\n\r\nProgramista nie musi wiedzieć jakie to komendy. Tłumaczeniem zajmuje się kompilator.\r\n\r\nAby wykonać program komputer:\r\n- uruchamia kompilator\r\n- kompilator tłumaczy tekst kodu ("kod źródłowy") na komendy dla procesora\r\n- komputer wykonuje skompilowane komendy - teraz są już zrozumiałe dla procesora.		6
10	5	medium	Jak się pisze program	________________________________________________________\n1)\nProgram pisze się tworząc kolejne instrukcje. \r\n\r\nInstrukcje grupowane są w funkcjach. \r\n\r\nFunkcje mogą być umieszczone w kodzie w dowolnej kolejności.\r\n\r\n(Co to jest instrukcja i funkcja dowiesz się w dalszej części kursu).\n\n\n________________________________________________________\n2)\nWewnątrz funkcji instrukcje są wykonywane w takiej kolejności jak zostały napisane.\r\n\r\nJeżeli w danej instrukcji wywołuje się inną funkcję - program przechodzi do niej, jest ona wykonywana, po czym program wraca do funkcji macierzystej i wykonuje jej nastepną linię kodu.		10
3	2	easy	Przedmiot tego kursu	Celem tego kursu jest nauczenie niektórych podstawowych elementów programowania w takim zakresie, jaki umożliwia napisanie:\r\n- prostej strony internetowej w HTML,\r\n- działającego na tej stronie programu w JavaScript..\r\n\r\nOpanowanie tych elementów otwiera drogę do programowania w innych językach, ponieważ sposób myślenia programistycznego i pojęcia są tam takie sam lub bardzo podobne.\r\n\r\nUWAGA: dla uproszczenia podajemy tu podstawowe zasady i narzędzia języka programowania nie zaznaczajac które są właściwe tylko dla JavaScript. Większość z nich jest jednak uniwersalna dla wszystkich języków. Tam gdzie nie jest - oszczędzamy tu użytkownikowi wchodzenia w szczegóły, zakładając, że jeśli zainteresuje się programowaniem to pozna szczegóły innych języków w swoim dalszym rozwoju.		3
4	2	easy	Elementy, których tu nie uczymy	Zakres tego kursu jest mały po to, żeby umożliwić wejście w świat programowania w możliwie łatwy sposób.\r\n\r\nNie uczymy tu w szczególności CSS, który jest potrzebny do tworzenia stron internetowych. \r\nAby opanować go w podstawowym zakresie potrzebny jest jednak znacznie krótszy kurs niż ten.\r\nNa dodatek zrozumienie czym jest strona internetowa, które umożliwiamy tutaj, ułatwia zrozumienie CSS.		4
7	6	easy	Kod programu	Kod każdego programu to po prostu tekst.\r\n\r\nTen tekst musi być napisany w określonym języku programowania.\r\n\r\n"Język programowania" to:\r\n- zestaw słów, pod którymi kryją się ściśle określone serie komend procesora\r\n- składnia - czyli kolejność słów, nawiasy, średniki, itd. niezbędne dla zrozumienia kodu przez kompilator.		7
8	6	easy	Pliki programu	Kod może znajdować się w jednym pliku lub w wielu plikach umieszczonych w wielu katalogach.\r\n\r\nKod strony internetowej jest tworzony w 2 lub w 3 językach, z których każdy odpowiada za inny aspekt strony (wyjaśniamy to dalej). Wszystkie trzy składniki mogą być umieszczone w jednym pliku. Ale mogą też być umieszczone w wielu osobnych plikach.		8
9	6	easy	Jak komputer wykonuje program	Komputer umie przetłumaczyć słowo zrozumiałe dla człowieka (słowo danego języka programowania) na serię komend dla procesora.\r\n\r\nProgramista nie musi wiedzieć jakie to komendy. Tłumaczeniem zajmuje się kompilator.\r\n\r\nAby wykonać program komputer:\r\n- uruchamia kompilator\r\n- kompilator tłumaczy tekst kodu ("kod źródłowy") na komendy dla procesora\r\n- komputer wykonuje skompilowane komendy - teraz są już zrozumiałe dla procesora.		9
11	10	easy	Instrukcje	Program pisze się tworząc kolejne instrukcje. \r\n\r\nInstrukcje grupowane są w funkcjach. \r\n\r\nFunkcje mogą być umieszczone w kodzie w dowolnej kolejności.\r\n\r\n(Co to jest instrukcja i funkcja dowiesz się w dalszej części kursu).		11
12	10	easy	Kolejność wykonania instrukcji	Wewnątrz funkcji instrukcje są wykonywane w takiej kolejności jak zostały napisane.\r\n\r\nJeżeli w danej instrukcji wywołuje się inną funkcję - program przechodzi do niej, jest ona wykonywana, po czym program wraca do funkcji macierzystej i wykonuje jej nastepną linię kodu.		12
14	13	easy	Co to jest IDE	Programy pisze się przy użyciu innych programów, specjalnie zbudowanych do pisania programów. ... :)\r\n\r\nProgram do pisania programów to IDE, czyli Integrated Development Environment.\r\n(Dlatego taki program programiści określają mianem "środowisko" - environment).		14
15	13	easy	Narzędzia i ułatwienia pracy	IDE bardzo ułatwia pracę.\r\n\r\nDo tworzenia stron internetowych można użyć np. darmowego środowiska NetBeans.\r\n\r\nTworząc nowy projekt typu "strona www" NetBeans automatycznie tworzy strukturę strony oddając gotowy szkielet do wypełnienia użytkownikowi. Generuje "html", "head" i "body", wypełnia "head" niezbędnym minimum wpisów. (O tych elementach strony mówimy w nieco dalej.)		15
16	13	easy	Edycja plików tekstowych	IDE wskazuje błędy w kodzie i daje wskazówki na czym polegają.\r\n\r\nKoloruje tekst ułatwiając rozróżnienie słów kluczowych, zmiennych, stringów itd.\r\n\r\nAutomatycznie formatuje tekst poprawiając jego czytelność.\r\n\r\nI oferuje wiele innych funkcji ułatwiających tworzenie kodu.\r\n\r\n(Edytor kodu dla użytkownika w tym kursie również posiada nieco takich funkcji.)		16
19	18	easy	Co to jest strona internetowa	"Strona internetowa" to jeden lub więcej plików tekstowych.\r\n\r\nTekst w tych plikach to kod trzech rodzajów: HTML, CSS i JavaScript. (Wyjaśnimy je za chwilę.)		19
20	18	easy	Jak działa strona internetowa	Pliki strony są pobierane na Twój komputer przez przeglądarkę.\r\n\r\nPrzeglądarka to po prostu program komputerowy, który umie :\r\n- pobrać dane z Internetu,\r\n- wykonać otrzymany kod HTML, CSS i JavaScript,\r\n- wyświetlić w swoim oknie wynik wykonania tego kodu.		20
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

SELECT pg_catalog.setval('edumodule_id_seq', 164, true);


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
8	0	84	Napisz 3 instrukcje:\r\nUtwórz zmienną "mamNaKoncie" i przypisz jej wartość 240.\r\nUtwórz zmienną "wyciagneOdMamy" i przypisz jej wartość: 50.\r\nUtwórz zmienną "mogeWydac" i przypisz jej wartość jako sumę poprzednich dwóch zmiennych.^// STUDENT_CODE_HERE\r\nreturn mogeWydac;^^javascript^290
9	0	86	Utwórz zmienną "hanShip"  i przypisz jej wartość "MilleniumHawk".^// STUDENT_CODE_HERE\r\nreturn hanShip;^^javascript^"MilleniumHawk"
10	0	87	Utwórz dwie zmienne nadając im wymyślone przez siebie nazwy.\r\nPrzypisz im wartości:\r\n- pierwszej: "echami"\r\n- drugiej: "da z orz"\r\n- trzeciej: "kola"\r\n- czwartej: "cze"\r\n\r\nTeraz utwórz zmienną "zapas" i przypisz do niej twoje 4 zmienne w odwrotnej kolejności niż zostały utworzone.^// STUDENT_CODE_HERE\r\nreturn zapas;^^javascript^Czekolada z orzechami
11	0	89	Utwórz zmienną "milHawkCrew" i przypisz jej wartość 2.\r\nUtwórz zmienną "crewCount" i przypisz jej liczbe 2 używając zmiennej "milHawkCrew".^// STUDENT_CODE_HERE\r\nreturn crewCount;^^javascript^2
12	0	90	Utwórz zmienne:\r\n-  "mojUlubionyNr" i przypisz jej wartość "Mój ulubiony numer to: ",\r\n-  "dlaRyzykantow" i przypisz jej wartość 13.\r\n\r\nUtwórz zmienną "losowanie" i przypisz jej wartość łącząc ze sobą utworzone zmienne tak jak łączy się stringi ("mojUlubioniyNr" jako pierwszy i "dlaRyzykantow" jako drugi element).\r\n^// STUDENT_CODE_HERE\r\nreturn losowanie;^^javascript^Mój ulubiony numer to: 13
13	0	96	Utwórz zmienną "boardHtml"  i przypisz jej wartość "<table>".\r\n\r\nDołącz do niej następujące stringi używając operacji z przypisaniem:\r\n\r\n"<tr>"\r\n"<td></td>"\r\n"<td></td>"\r\n"</tr>"\r\n\r\n"<tr>"\r\n"<td></td>"\r\n"<td></td>"\r\n"</tr>"\r\n\r\n"</table>"\r\n\r\nW taki sposób tworzy się w JavaScript nowy element HTML - tu: tabelkę z 2 wierszami, w każdym wierszu 2 komórki. \r\nTak utworzony string można następnie wstawić na stronę (zobaczysz jak w dalszej części kursu).^// STUDENT_CODE_HERE\r\n\r\nvar css = document.createElement("style");\r\ncss.innerHTML += "table, table * {"\r\ncss.innerHTML += "width: 12rem;";\r\ncss.innerHTML += "height: 3rem;";\r\ncss.innerHTML += "border: 1px solid black;";\r\ncss.innerHTML += "margin-left: 2px;";\r\ncss.innerHTML += "margin-top: 2px;";\r\ncss.innerHTML += "padding: 2px;";\r\ncss.innerHTML += "padding-top: 0;"\r\ncss.innerHTML += "}"\r\n\r\nvar divOutput = document.getElementById("codeOutput");\r\ndivOutput.innerHTML = boardHtml;\r\ndivOutput.appendChild(css);\r\n\r\nreturn boardHtml;^^javascript^<table><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>
14	0	97	Utwórz zmienną "mojaPizza" i przypisz jej wartość 6;\r\n\r\n4 razy zdekrementuj tę zmienną (zjedz 4 kawałki).\r\n2 razy inkrementuj (weź 2 dokładki). \r\n\r\nKolejność zjadania (dekrementacji) i dokładek inkrementacji) pizzy jest dowolna.\r\n^// STUDENT_CODE_HERE\r\nreturn mojaPizza;^^javascript^4
15	0	103	Utwórz tablicę "weapons" zawierającą takie elementy:\r\n"light saber"\r\n"laser gun"\r\n"crossbow"\r\n\r\nZastosuj dowolną metodę tworzenia tablicy.^// STUDENT_CODE_HERE\r\nif (weapons == undefined)\r\n    return "brak tablicy";\r\nif (weapons.length != 3)\r\n    return "zły rozmiar tablicy";\r\n\r\nvar nCorrectElements = 0;\r\nif (weapons.indexOf("lightsaber") > -1) nCorrectElements++;\r\nif (weapons.indexOf("laser gun") > -1) nCorrectElements++;\r\nif (weapons.indexOf("cross bow") > -1) nCorrectElements++;\r\nreturn nCorrectElements;\r\n^^javascript^3
16	0	104	Utwórz zmienną i przypisz jej string zawierający liczby 90, 60, 90 oddzielone znakami "x".\r\nOprócz liczb i znaków "x" nie może w nim być żadnych spacji ani innych znaków.\r\n\r\nUtwórz zmienną "wymiary" i przypisz do niej tablicę tworząc ją z twojej zmiennej.\r\nDla utworzenia tablicy użyj funkcji "split" dzieląc string znakiem "x".^// STUDENT_CODE_HERE\r\nif (wymiary == undefined)\r\n    return "brak tablicy";\r\nif (wymiary.length != 3)\r\n    return "zły rozmiar tablicy";\r\n\r\nvar total = 0;\r\ntotal += Number(wymiary[0]);\r\ntotal += Number(wymiary[1]);\r\ntotal += Number(wymiary[2]);\r\nreturn total;\r\n^^javascript^240
17	0	105	Utwórz tablicę "planets" zawierającą 4 elementy.\r\n\r\nNastępnie przypisz jej elementom wartości pod podanymi indeksami:\r\n"Tatooine"   - indeks 3\r\n"Naboo"   - indeks 0\r\n"Hoth"   - indeks 2\r\n"Alderaan"   - indeks 1^// STUDENT_CODE_HERE\r\nif (planets == undefined)\r\n    return "brak tablicy";\r\nif (planets.length != 4)\r\n    return "zły rozmiar tablicy";\r\n\r\nvar nCorrectElements = 0;\r\nif (planets[3] === "Tatooine") nCorrectElements++;\r\nif (planets[0] === "Naboo") nCorrectElements++;\r\nif (planets[2] === "Hoth") nCorrectElements++;\r\nif (planets[1] === "Alderaan") nCorrectElements++;\r\nreturn nCorrectElements;\r\n^^javascript^4
18	0	108	Utwórz tablicę dwuwymiarową "iceCream".\r\nLiczebność pierwszego wymiaru: 2, liczebność drugiego: 4.\r\n\r\nWypelnij tablicę stanowiącą element pod indeksem 0 nazwami Twoich ulubionych lodów. (Użyj stringów).\r\n\r\nWypełnij tablicę stanowiącą element pod indeksem 1 liczbami całkowitymi od 1 do 4, w dowolnej kolejności, tworząc ranking Twoich ulubionych smaków.^// STUDENT_CODE_HERE\r\nif (iceCream == undefined)\r\n    return "brak tablicy";\r\nif (iceCream.length != 2 || iceCream[0].length != 4)\r\n    return "zły rozmiar tablicy";\r\n\r\nvar total = 0;\r\niceCream[1].forEach(function(rank) {\r\n    total+=rank;})\r\nreturn total;^^javascript^10
19	0	109	Utwórz tablicę dwuwymiarową "sithSaber".\r\nLiczebność pierwszego wymiaru: 3, liczebność drugiego: 2.\r\n\r\nWypełnij tablicę podając podając w tablicy pod każdym indeksem głównym jednego Sitha.\r\nPod indeksem 0 - jego imię, pod indeksem 1 - długość jego miecza świetlnego.\r\n\r\nWstaw takie dane\r\n"Darth Vader"  1\r\n"Darth Maul"  2\r\n"Snoke"  0\r\n\r\nUtwórz zmienną "longestSaber" i przypisz jej wartość najdłuższego miecza \r\nświetlnego, pobierając ją z utworzonej tablicy.^// STUDENT_CODE_HERE\r\nif (sithSaber == undefined)\r\n    return "brak tablicy";\r\nif (sithSaber.length != 2 || sithSaber[0].length != 3)\r\n    return "zły rozmiar tablicy";\r\n\r\nreturn longestSaber;^^javascript^2
20	0	112	Utwórz zmienne i przypisz im wartości: \r\n"liczbaMin" : 100\r\n"liczbaSaperow" : 10\r\n"trzezwySaper"  : "false"\r\n\r\nNapisz instrukcję "if" gdzie zmniejszasz liczbę min o 10 jeśli saper jest trzeźwy.\r\n\r\nNapisz instrukcję "if" gdzie zmniejszasz liczbę saperów o 1 jeśli saper nie jest trzeźwy.^// STUDENT_CODE_HERE\r\nreturn liczbaMin + liczbaSaperow;^^javascript^109
21	0	113	Utwórz zmienne i przypisz im wartości: \r\n"silaWybuchu" : 75\r\n"rodzajMiny"  : tylko deklaracja zmiennej, bez wartości\r\n\r\nNapisz instrukcję "if - else" gdzie ustawiasz rodzaj miny :\r\n1. jeśli siła wybuchu jest mniejsza niż 25 : "przeciwpiechotna" ,\r\n2. w pozostałych przupadkach : "przeciwpancerna".^// STUDENT_CODE_HERE\r\nreturn rodzajMiny;^^javascript^przeciwpancerna
22	0	114	Utwórz zmienne i przypisz im wartości: \r\n"liczbaMin" : 100\r\n"liczbaSaperow" : 10\r\n"saperNeurotyk"  : 31\r\n\r\nNapisz instrukcję "if - else if - else" gdzie :\r\n1. zmniejszasz liczbę min o 1  jeśli neurotyzm sapera jest większy niż 80,\r\n2. zmnjeszasz liczbę min o 20, jesli neurotyzm sapera jest większy niż 30\r\n3. zmniejszasz liczbę saperów o 1 jeśli żaden z poprzednich warunków nie zachodzi.^// STUDENT_CODE_HERE\r\nreturn liczbaMin + liczbaSaperow;^^javascript^90
1	0	38	1. Utwórz element "div"\r\n2. Wstaw do niego drugi element "div"^<style>\r\n    #studentHtml * {\r\n        width: 50%;\r\n        height: 50%;\r\n        margin: 4px;\r\n        padding: 3px;\r\n        border: 1px solid black;\r\n    }\r\n</style>\r\n<div id="studentHtml">                        \r\n    // STUDENT_CODE_HERE\r\n</div>^var studentHtml = document.getElementById("studentHtml").innerHTML;\r\nreturn studentHtml.replace(/\\r\\n|\\r|\\n|\\t| /g, "");^html^<div><div></div></div>
2	0	39	Utwórz jeden pod drugim elementy:\r\n- "input" typ "text"\r\n- "input" typ "button"\r\n\r\n(Możesz kliknąć przycisk i wpisać coś w input ale na razie nie wywoła to żadnej akcji.)^<style>\r\n    #studentHtml {\r\n        height: 1.5rem;\r\n    }\r\n    #studentHtml input,\r\n    #studentHtml button {\r\n        width: 7rem;\r\n        height: 100%;\r\n        margin: 4px;\r\n        padding: 3px;\r\n        border: 1px solid black;\r\n        float: left;\r\n    }\r\n</style>\r\n<div id="studentHtml">                        \r\n    // STUDENT_CODE_HERE\r\n</div>^var inputs = document.getElementById("studentHtml").getElementsByTagName("input");\r\nvar nInput = 0;\r\nvar nButton = 0;\r\n\r\nfor (var i = 0; i < inputs.length; i++)\r\n    if (inputs[i].getAttribute("type") === "text")\r\n        nInput++;\r\n    else if (inputs[i].getAttribute("type") === "button")\r\n        nButton++;\r\n\r\nreturn nInput + nButton;^html^2
3	0	43	Utwórz poniższe elementy i nadaj im podane atrybuty:\r\n\r\nNajpierw:\r\n- "div": id "przygotujAtak"\r\n\r\npotem wewnątrz tego "div" utwórz 2 elementy:\r\n- "input": typ "text", id "tekstCel"\r\n- "input": typ "button", id "przycAtak"^<style>\r\n    #studentHtml {\r\n        height: 80%;\r\n        width: 80%;\r\n    }\r\n    #studentHtml > div {\r\n        width: 70%;\r\n        height: 8rem;\r\n        margin: 4px;\r\n        border: 1px solid black;\r\n    }\r\n    #studentHtml input {\r\n        width: 7rem;\r\n        height: 1.3rem;\r\n        margin: 4px;\r\n        padding: 3px;\r\n        border: 1px solid black;\r\n        float: left;\r\n    }\r\n</style>\r\n<div id="studentHtml">                        \r\n    // STUDENT_CODE_HERE\r\n</div>^var nPrzygotuj = 0;\r\nif (document.getElementById("przygotujAtak") !== undefined)\r\n    nPrzygotuj++;\r\n\r\nvar nInput = 0;\r\nvar tekstCel = document.getElementById("tekstCel");\r\nif (tekstCel != undefined)\r\n    if (tekstCel.getAttribute("type") === "text")\r\n        nInput++;\r\n\r\nvar nButton = 0;\r\nvar tekstCel = document.getElementById("przycAtak");\r\nif (tekstCel != undefined)\r\n    if (tekstCel.getAttribute("type") === "button")\r\n        nButton++;\r\n\r\nreturn nPrzygotuj + nInput + nButton;^html^3
4	0	44	Utwórz elementy "input" z takimi atrybutami:\r\n"id": "pizzaNow"\r\n"type" : "button"\r\n"value" : "Chcę pizzę teraz!"\r\n\r\nGdy przycisk się pojawi, kliknij go.^<style>\r\n    #studentHtml {\r\n        height: 100%;\r\n        width: 100%;\r\n        margin: 0;\r\n        padding: 0;\r\n    }\r\n    #studentHtml > div {\r\n        min-width: 100%;\r\n        margin-left: 0;\r\n        margin-top: 3rem;\r\n        padding: 4px;\r\n    }\r\n    #studentHtml input {\r\n        width: 9rem;\r\n        height: 1.4rem;\r\n        margin: 4px;\r\n        padding: 3px;\r\n        border: 1px solid black;\r\n    }\r\n</style>\r\n<div id="studentHtml">                        \r\n    // STUDENT_CODE_HERE\r\n    <div id="odpowiedz"></div>\r\n</div>^var n = 0;\r\nvar pizza = document.getElementById("pizzaNow");\r\n\r\nif (pizza !== undefined) {\r\n    if (pizza.getAttribute("type") === "button")\r\n        n++;\r\n    if (pizza.getAttribute("value") === "Chcę pizzę teraz!")\r\n        n++;\r\n}\r\n\r\npizza.addEventListener("click", function() {    \r\n    document.getElementById("odpowiedz").innerHTML = \r\n        "pizza wyszła! będzie za tydzień!<br>jak chce to kartofle mamy od ręki";\r\n});\r\n\r\nreturn n;^html^2
5	0	78	Utwórz zmienną "mojMaxPaczkow" od razu przypisując jej wartość 32.^// STUDENT_CODE_HERE\r\nreturn mojMaxPaczkow;^^javascript^32
6	0	79	Utwórz zmienną "mojMaxPaczkow".\r\nW kolejnej linii przypisz jej wartosc 34;^// STUDENT_CODE_HERE\r\nreturn mojMaxPaczkow;^^javascript^34
7	0	83	Utwórz instrukcję w której tworzysz zmienną "lubieRozprawki" i przypisujesz jej wartość:   -8.\r\n(UWAGA - nie pomiń minusa przed dziwiątką - to znak liczby, a nie myślnik.)^// STUDENT_CODE_HERE\r\nreturn lubieRozprawki;^^javascript^-8
23	0	117	Utwórz zmienne i przypisz im wartości\r\n"oszczednosci" : 100\r\n"procent" : 1.05\r\n"liczbaLat" : 20\r\n\r\nUtwórz pętlę "for", która :\r\n- wykona się tyle razy ile wynosi liczba lat,\r\n- w każdym obrocie oszczędności zostaną pomnożone przez procent..^// STUDENT_CODE_HERE\r\nreturn Math.round(oszczednosci);^^javascript^265
24	0	119	Utwórz zmienne i przypisz im wartości\r\n"rozbrojoneMiny" : tablica 4-elementowa \r\n"poleMinowe" : 13\r\n"liczbaGodzin" : 4\r\n\r\nKolejnym elementom tablicy przypisz liczby : 2, 4, 1, 6\r\n\r\nUtwórz pętlę "for", która :\r\n- wykona się tyle razy ile wynosi liczba godzin,\r\n- w każdym obrocie pole minowe zmniejszy się o tyle min, ile jest w tablicy "rozbrojoneMiny" pod indeksem wskazanym przez iterator pętli.^// STUDENT_CODE_HERE\r\nreturn poleMinowe;^^javascript^0
25	0	120	Utwórz tablice :\r\n"stopienWojskowy" i wstaw do niej : "szer", "kapral", "kpt", "gen"\r\n"pojazdSapera" i wstaw do niej : "wielbłąd", "koń", "czołg", "limo"\r\n\r\nUtwórz tablicę\r\n"transport" i wstaw do niej pierwsze dwie tablice.\r\n\r\nUtwórz zmienną "pojazdy" i przypisz jej wartość "" (pusty string).\r\n\r\nUtwórz pętlę "for", a wniej drugi "for".\r\nW tej podwójnej pętli stwórz string przyisany do zmiennej "pojazdy" ,\r\nzbudowany z par "stopień-pojazd" pobierając dane z tablicy "transport". \r\n\r\nZa każdym elementem dodawaj w pętli znak "-".^// STUDENT_CODE_HERE\r\nif (transport == undefined)\r\n    return "brak tablicy";\r\nif (transport.length != 2 || transport[0].length != 4)\r\n    return "zły rozmiar tablicy";\r\n\r\nreturn pojazdy;^^javascript^szer-wielbłąd-kapral-koń-kpt-czołg-gen-limo-
\.


--
-- TOC entry 2272 (class 0 OID 0)
-- Dependencies: 198
-- Name: test_code_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lmp
--

SELECT pg_catalog.setval('test_code_id_seq', 25, true);


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
1	pysio	grubasek	teacher	0	33
2	Konio	buzdygan	admin	\N	\N
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
1	1	2018-01-13 22:12:37.541486
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


-- Completed on 2018-01-14 13:52:05

--
-- PostgreSQL database dump complete
--

