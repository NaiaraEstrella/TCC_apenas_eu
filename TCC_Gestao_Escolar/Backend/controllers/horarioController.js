const { exec } = require('child_process');
const path = require('path');

exports.gerarHorario = (req, res) => {
  const pythonScript = path.join(__dirname, '..', 'ia', 'horarios_ia.py');

  exec(`python3 ${pythonScript}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o script Python: ${error.message}`);
      return res.status(500).json({ erro: 'Erro ao gerar horário' });
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }

    try {
      const resultado = JSON.parse(stdout);
      res.status(200).json(resultado);
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao interpretar resposta da IA' });
    }
  });
};
