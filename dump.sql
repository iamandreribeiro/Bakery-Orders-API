--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cakes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cakes (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    price numeric NOT NULL,
    image character varying(200) NOT NULL,
    description text NOT NULL
);


--
-- Name: cakes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cakes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cakes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cakes_id_seq OWNED BY public.cakes.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    address character varying(200) NOT NULL,
    phone character varying(50) NOT NULL
);


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "cakeId" integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "totalPrice" numeric NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: cakes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes ALTER COLUMN id SET DEFAULT nextval('public.cakes_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: cakes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cakes VALUES (1, 'bolo de nozes', 19.99, 'https://t1.rg.ltmcdn.com/pt/posts/4/8/9/bolo_de_nozes_com_baba_de_moca_7984_600_square.jpg', ' Bolo de Nozes macio e delicioso feita com ovos, açúcar mascavo, leite em pó');
INSERT INTO public.cakes VALUES (2, 'bolo floresta negra', 13, 'https://img.cybercook.com.br/receitas/261/bolo-floresta-negra-5.jpeg', 'Delicioso bolo em camadas de bolo de chocolate com chantilly e cerejas entre cada camada');
INSERT INTO public.cakes VALUES (3, 'bolo de cenoura', 9.99, 'https://assets.unileversolutions.com/recipes-v2/67405.jpg', 'Delicioso bolo doce feito com cenoura e calda de chocolate');


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clients VALUES (1, 'Fulana', 'Rua tal', '21999999999');
INSERT INTO public.clients VALUES (2, 'Jorge Aragão', 'Rua taltal', '62999999999');
INSERT INTO public.clients VALUES (3, 'cristiano ronaldo', 'saudi arabia', '7777777777');
INSERT INTO public.clients VALUES (4, 'Yuri Alberto', 'NeoQuimicaArena NQA', '99999999999');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders VALUES (1, 1, 1, 2, '2023-01-05 18:11:40.725426', 39.98);
INSERT INTO public.orders VALUES (2, 2, 1, 2, '2023-01-05 18:11:44.356393', 39.98);
INSERT INTO public.orders VALUES (3, 2, 1, 1, '2023-01-05 18:12:27.292838', 19.99);
INSERT INTO public.orders VALUES (4, 4, 3, 4, '2023-01-10 20:26:00.485006', 39.96);
INSERT INTO public.orders VALUES (5, 3, 2, 4, '2023-01-10 20:26:23.72362', 52);


--
-- Name: cakes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cakes_id_seq', 3, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clients_id_seq', 4, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 5, true);


--
-- Name: cakes cakes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cakes
    ADD CONSTRAINT cakes_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: orders orders_cakeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_cakeId_fkey" FOREIGN KEY ("cakeId") REFERENCES public.cakes(id);


--
-- Name: orders orders_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id);


--
-- PostgreSQL database dump complete
--

