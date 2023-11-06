const { exec } = require("child_process");

const nameArg = process.argv[2];
if (!nameArg) {
  console.error("Erro: Um nome de migration é necessário.");
  process.exit(1);
}

const command = `rm -rf dist && yarn build && yarn typeorm migration:generate ./src/migrations/${nameArg} -d ./utils/data-source.ts`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro: ${error}`);
    console.error(`Erro message: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erro: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});
