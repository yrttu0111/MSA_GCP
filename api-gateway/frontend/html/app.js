

const form = document.querySelector('form');
const diaryInput = document.getElementById('diary');
const responseDiv = document.getElementById('response');
const submitBtn = document.getElementById('submit-btn');



form.addEventListener('submit', async function(event) { 
  event.preventDefault();
  
  const accessTokenData = await axios.post(
    "http://localhost/graphql",
    {
      query: `
      mutation{
      restoreAccessToken
      }
      `,
    },
    { withCredentials: true }
  
  );
  if (accessTokenData.data.data === null){
    alert('로그인이 필요합니다.');
    window.location.href = "http://localhost/social-login.html"
  }
  const accessToken = accessTokenData.data.data.restoreAccessToken;

  const diaryContent = diaryInput.value.trim().replace(/\n/g, '\\n');

  if (diaryContent === '') {
    alert('일기 내용을 입력해주세요');
    return;
  }
  console.log(diaryContent)

  submitBtn.disabled = true;
  responseDiv.textContent = '읽기짱이 읽고있어요...';
  responseDiv.classList.remove('hidden');

  try {
    const response = await axios.post(
      "http://localhost/graphql",
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
    responseDiv.textContent = '일기 분석에 실패했습니다. 다시 시도해주세요.';
  }

  submitBtn.disabled = false;
});
