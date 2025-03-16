import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import FormularioConsulta from "./components/FormularioConsulta.tsx";
import HistoricoConsultas from "./components/HistoricoConsultas.tsx";

// Configuração do tema dark mode
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
        secondary: {
            main: "#7c4dff",
        },
        background: {
            default: "#121212",
            paper: "#1e1e1e",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b3b3b3",
        },
    },
});

const FipeChecker = () => {
    const [fabricantes, setFabricantes] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [anos, setAnos] = useState([]);
    const [valor, setValor] = useState(null);
    const [historico, setHistorico] = useState([]);

    const [fabricanteSelecionado, setFabricanteSelecionado] = useState("");
    const [modeloSelecionado, setModeloSelecionado] = useState("");
    const [anoSelecionado, setAnoSelecionado] = useState("");

    const nomeFabricante = fabricanteSelecionado ? fabricanteSelecionado.nome : "";
    const idFabricante = fabricanteSelecionado ? fabricanteSelecionado.codigo : "";

    const FIPE_API_TOKEN = process.env.REACT_APP_FIPE_API_TOKEN;

    const apiFipe = axios.create({
        baseURL: "https://parallelum.com.br/fipe/api/v1",
        headers: {
            Authorization: `Bearer ${FIPE_API_TOKEN}`,
        },
    });

    // Buscar fabricantes ao carregar
    useEffect(() => {
        apiFipe.get("/carros/marcas")
            .then((res) => setFabricantes(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Buscar modelos ao selecionar fabricante
    useEffect(() => {
        if (fabricanteSelecionado) {
            apiFipe.get(`/carros/marcas/${idFabricante}/modelos`)
                .then((res) => setModelos(res.data.modelos))
                .catch((err) => console.error(err));
        }
    }, [fabricanteSelecionado]);

    // Buscar anos ao selecionar modelo
    useEffect(() => {
        if (modeloSelecionado) {
            apiFipe.get(`/carros/marcas/${idFabricante}/modelos/${modeloSelecionado}/anos`)
                .then((res) => setAnos(res.data))
                .catch((err) => console.error(err));
        }
    }, [modeloSelecionado]);

    // Limpar valor quando o fabricante, modelo ou ano for alterado
    useEffect(() => {
        setValor(null);
    }, [fabricanteSelecionado, modeloSelecionado, anoSelecionado]);

    // Buscar valor ao clicar no botão
    const buscarValor = () => {
        if (anoSelecionado) {
            apiFipe.get(`/carros/marcas/${idFabricante}/modelos/${modeloSelecionado}/anos/${anoSelecionado}`)
                .then((res) => {
                    setValor(res.data.Valor);

                    // Adicionar a consulta ao histórico
                    const novaConsulta = {
                        fabricante: nomeFabricante,
                        modelo: modelos.find((mod) => mod.codigo === modeloSelecionado)?.nome,
                        ano: anos.find((ano) => ano.codigo === anoSelecionado)?.nome,
                        valor: res.data.Valor,
                        data: new Date().toLocaleString(),
                    };
                    setHistorico((prevHistorico) => [novaConsulta, ...prevHistorico]);
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    backgroundColor: "background.default",
                    padding: "1rem",
                    gap: 3,
                    flexDirection: { xs: "column", md: "row" },
                }}
            >
                <FormularioConsulta
                    fabricantes={fabricantes}
                    modelos={modelos}
                    anos={anos}
                    fabricanteSelecionado={fabricanteSelecionado}
                    modeloSelecionado={modeloSelecionado}
                    anoSelecionado={anoSelecionado}
                    valor={valor}
                    onFabricanteChange={(e) => setFabricanteSelecionado(e.target.value)}
                    onModeloChange={(e) => setModeloSelecionado(e.target.value)}
                    onAnoChange={(e) => setAnoSelecionado(e.target.value)}
                    onBuscarValor={buscarValor}
                />

                <HistoricoConsultas
                    historico={historico}
                    onLimparHistorico={() => setHistorico([])}
                />
            </Box>
        </ThemeProvider>
    );
};

export default FipeChecker;