const prompts = require('prompts');
const fetch = require('node-fetch');

function clear() {
  process.stdout.write('\033c');
}

( async () => {
  clear();
  const { username } = await prompts({
    type: 'text',
    name: 'username',
    message: 'Username GitHub: ',
  });

  console.log('Mengambil data dari API...');

  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  if (res.status == 200) {
    clear();
    console.log('########### INFORMASI USER GITHUB ###########');
    console.log(`ID             : ${data.id}`);
    console.log(`Username       : ${data.login}`);
    console.log(`Nama           : ${data.name}`);
    console.log(`Jumlah Repo    : ${data.public_repos}`);
    console.log(`Pengikut       : ${data.followers}`);
    console.log(`Mengikuti      : ${data.following}`);
    console.log('#############################################');
    console.log('');
  } else if (res.status == 404) {
    console.log(`Error: User tidak ditemukan (${data.message})`);
  } else {
    console.log(`Error: ${data.message}`);
  }

  process.exit(0);
})();