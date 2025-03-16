import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent,
    Typography,
    Paper,
    Grid,
    Box,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from "@mui/material";
import { History } from "@mui/icons-material"; // Ícone para o título do histórico

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
                    setHistorico((prevHistorico) => [novaConsulta, ...prevHistorico]); // Adiciona no início do histórico
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline /> {/* Aplica o fundo escuro globalmente */}
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
                {/* Formulário de Consulta */}
                <Paper elevation={3} sx={{ maxWidth: 500, padding: 3, borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom align="center" fontWeight="bold" style={{ marginBottom: "0" }}>
                        Consulta Tabela FIPE 🚗
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom align="center" color="textSecondary" style={{ marginBottom: "1rem" }}>
                        Consulte agora mesmo a tabela FIPE do seu veículo
                    </Typography>

                    <FormControl fullWidth sx={{ marginBottom: 3 }}>
                        <InputLabel id="fabLabel">Fabricante</InputLabel>
                        <Select labelId="fabLabel" label="Fabricante" value={fabricanteSelecionado} onChange={(e) => setFabricanteSelecionado(e.target.value)}>
                            {fabricantes.map((fab) => (
                                <MenuItem key={fab.codigo} value={fab}>{fab.nome}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    
                    <FormControl fullWidth sx={{ marginBottom: 3 }} disabled={!fabricanteSelecionado}>
                        <InputLabel id="modLabel">Modelo</InputLabel>
                        <Select labelId="modLabel" label="Modelo" value={modeloSelecionado} onChange={(e) => setModeloSelecionado(e.target.value)}>
                            {modelos.map((mod) => (
                                <MenuItem key={mod.codigo} value={mod.codigo}>{mod.nome}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ marginBottom: 3 }} disabled={!modeloSelecionado}>
                        <InputLabel id="anoLabel">Ano</InputLabel>
                        <Select labelId="anoLabel" label="Ano" value={anoSelecionado} onChange={(e) => setAnoSelecionado(e.target.value)}>
                            {anos.map((ano) => (
                                <MenuItem key={ano.codigo} value={ano.codigo}>{ano.nome}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={buscarValor}
                        disabled={!anoSelecionado}
                    >
                        Consultar Valor
                    </Button>

                    {valor && (
                        <Card sx={{ marginTop: 3, backgroundColor: "secondary.main" }}>
                            <CardContent>
                                <Typography variant="h6" align="center" fontWeight="bold">
                                    Valor do Veículo:
                                </Typography>
                                <Typography variant="body1" align="center">
                                    atualizado em {new Date().toLocaleString().replace(",", " às")}
                                </Typography>
                                <Typography variant="h4" align="center" fontWeight="bold" color="#fff">
                                    {valor}
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Paper>

                {/* Histórico de Consultas */}
                <Paper elevation={3} sx={{ maxWidth: 500, width: "100%", padding: 3, borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
                        <History sx={{ verticalAlign: "middle", marginRight: 1 }} />
                        Histórico de Consultas
                    </Typography>

                    {historico.length > 0 ? (
                        <>
                            <Grid container spacing={2}>
                                {historico.map((consulta, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h7" gutterBottom>
                                                    {consulta.fabricante} {consulta.modelo} ({consulta.ano})
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Valor: {consulta.valor}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Data: {consulta.data}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => setHistorico([])} // Limpa o histórico
                                >
                                    Limpar Histórico
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body1" align="center" color="textSecondary">
                            Nenhuma consulta realizada ainda.
                        </Typography>
                    )}
                </Paper>
            </Box>
        </ThemeProvider>
    );
};

export default FipeChecker;