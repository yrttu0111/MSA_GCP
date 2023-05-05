const form = document.querySelector('form');
const diaryInput = document.getElementById('diary');
const responseDiv = document.getElementById('response');
const submitBtn = document.getElementById('submit-btn');



form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const accessTokenData = await axios.post(
    "https://jintakim.shop//graphql",
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
    alert('로그인이 필요합니다.');
  }

  const diaryContent = diaryInput.value.trim();

  if (diaryContent === '') {
    alert('일기 내용을 입력해주세요');
    return;
  }

  submitBtn.disabled = true;
  responseDiv.textContent = '일기를 분석하는 중입니다...';
  responseDiv.classList.remove('hidden');

  try {
    const response = await axios.post(
      "https://jintakim.shop//graphql",
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
    ${answer}, 
    ${ask}
    `;
  } catch (error) {
    responseDiv.textContent = '일기 분석에 실패했습니다. 다시 시도해주세요.';
  }

  submitBtn.disabled = false;
});