import React from "react";
import { Card, CardContent, Typography, Grid, Box, Button, Paper } from "@mui/material";
import { History } from "@mui/icons-material";

const HistoricoConsultas = ({ historico, onLimparHistorico }) => {
    return (
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
                            onClick={onLimparHistorico}
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
    );
};

export default HistoricoConsultas;