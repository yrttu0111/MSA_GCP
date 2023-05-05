const form = document.querySelector('form');
const diaryInput = document.getElementById('diary');
const responseDiv = document.getElementById('response');
const submitBtn = document.getElementById('submit-btn');



form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const accessTokenData = await axios.post(
    "https://jintakim.shop/graphql",
    {
      query: `
      mutation{
      restoreAccessToken
      }
      `,
    },
    { withCredentials: true }
  
  );
  console.log (accessTokenData.data.data.restoreAccessToken);
  const accessToken = accessTokenData.data.data.restoreAccessToken;
  if (accessTokenData.data.data === null){
    alert('로그인 해줘잉.');
  }

  const diaryContent = diaryInput.value.trim().replace(/\n/g, '\\n');

  if (diaryContent === '') {
    alert('일기 내용을 입력해줘잉');
    return;
  }
  submitBtn.disabled = true;
  responseDiv.textContent = '읽기짱이 읽는중';
  responseDiv.classList.remove('hidden');

  try {
    const response = await axios.post(
      "https://jintakim.shop/graphql",
      {
        query: `
        mutation{
          DiaryChatBot(createCompletionDto:{
            ask:"${diaryContent}"
          }){
            id
            ask
            answer
            user{
              id
            }
          }
        }
        `,
      },
      {
        headers: {
          Authorization:
            `Bearer ${accessToken} `,
        },
      }
    );
    // axios.post('/api/diary', { content: diaryContent });

    const {answer, ask} = response.data.data.DiaryChatBot;

    responseDiv.textContent = 
    `
    ${answer}
    `;
  } catch (error) {
    responseDiv.textContent = '어랍숑. 다시 시도해주세요. ㅠㅠ';
  }

  submitBtn.disabled = false;
});