import React from "react";
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
    Box,
} from "@mui/material";

const FormularioConsulta = ({
    fabricantes,
    modelos,
    anos,
    fabricanteSelecionado,
    modeloSelecionado,
    anoSelecionado,
    valor,
    onFabricanteChange,
    onModeloChange,
    onAnoChange,
    onBuscarValor,
}) => {
    return (
        <Paper elevation={3} sx={{ maxWidth: 500, width: '100%', padding: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom align="center" fontWeight="bold" style={{ marginBottom: "0" }}>
                Consulta Tabela FIPE 🚗
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center" color="textSecondary" style={{ marginBottom: "1rem" }}>
                Consulte agora mesmo a tabela FIPE do seu veículo
            </Typography>

            <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel id="fabLabel">Fabricante</InputLabel>
                <Select
                    labelId="fabLabel"
                    label="Fabricante"
                    value={fabricanteSelecionado}
                    onChange={onFabricanteChange}
                >
                    {fabricantes.map((fab) => (
                        <MenuItem key={fab.codigo} value={fab}>
                            {fab.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 3 }} disabled={!fabricanteSelecionado}>
                <InputLabel id="modLabel">Modelo</InputLabel>
                <Select
                    labelId="modLabel"
                    label="Modelo"
                    value={modeloSelecionado}
                    onChange={onModeloChange}
                >
                    {modelos.map((mod) => (
                        <MenuItem key={mod.codigo} value={mod.codigo}>
                            {mod.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 3 }} disabled={!modeloSelecionado}>
                <InputLabel id="anoLabel">Ano</InputLabel>
                <Select
                    labelId="anoLabel"
                    label="Ano"
                    value={anoSelecionado}
                    onChange={onAnoChange}
                >
                    {anos.map((ano) => (
                        <MenuItem key={ano.codigo} value={ano.codigo}>
                            {ano.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={onBuscarValor}
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
    );
};

export default FormularioConsulta;