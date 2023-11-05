const { exec } = require("child_process");

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("Por favor, forneça um nome para a migration.");
  process.exit(1);
}

const command = `rm -rf dist && yarn build && yarn typeorm migration:create ./src/migrations/${migrationName}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao executar o comando: ${error.message}`);
    return;
  }

  console.log(stdout);

  if (stderr) {
    console.error(stderr);
  }
});
