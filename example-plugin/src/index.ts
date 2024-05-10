export function create_front_layout() {
  const frontHTML = `
<style>
  .card-front {
    padding-top: 25%;
    position: fixed;
    background: url('https://i.ibb.co/q5J5RKD/tulip.jpg') no-repeat center center fixed;
    background-size: cover;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  h1 {
    font-family: Georgia, serif;
    color: #fff;
    text-shadow: 2px 5px 4px rgba(224, 81, 112, .95);
    font-size: 42px;
    line-height: 40px;
  }

  p {
    font-family: Tahoma, sans-serif;
    font-size: 25px;
    text-align: left;
    color: #fff;
    background-color: #ffe749;
    border-bottom: 5px solid #ccb836;
    border-radius: 0 0 30px;
    margin-right: 40px;
    line-height: 1.4;
    padding: 20px 40px 20px 20px;
    text-shadow: 0 1px 5px rgba(88, 77, 0, .4);
  }

  span {
    display: inline-block;
    margin: auto;
    color: #fafafa;
    letter-spacing: 1.2;
    text-shadow: 1px 1px 9px #814251;
    background-color: #d76f86;
    border-bottom: 5px solid #72404b;
    border-radius: 15px;
    padding: 20px;
    margin-top: 20px;
    font-family: 'Brush Script MT', cursive;
    font-size: 27px;
    font-style: normal;
  }
</style>
<div class="card-front">
  <h1>Mother's Day Family Trivia</h1>

  <p>Have fun with this little quiz about the most wonderful Mom around!</p>

  <span>Open the card to play!</span>
</div>
`;
  Host.outputString(frontHTML);
  return 0;
}

export function create_card_layout() {
  const html = `
<style>
  .card-inside {
    padding-top: 25%;
    position: fixed;
    background: url('https://i.ibb.co/Y0SQwCk/pattern-1.jpg') repeat center center fixed;
    background-size: cover;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .inside-content {
    background-color: rgba(255, 255, 255, 0.75);
    padding: 20px;
    width: 80%;
    position: fixed;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
  }
  p {
    font-family: Tahoma, sans-serif;
    font-size: 25px;
    text-align: left;
    color: #fff;
    background-color: #ffe749;
    border-bottom: 5px solid #ccb836;
    border-radius: 0 0 30px;
    margin-right: 40px;
    line-height: 1.4;
    padding: 20px 40px 20px 20px;
    text-shadow: 0 1px 5px rgba(88, 77, 0, .4);
  }

  select {
    font-size: 30px;
    margin-bottom: 30px;
  }

  .answer-status {
    font-family: Georgia, serif;
    font-size: 24px;
  }

  .controls {
    margin-top: 20px
  }

</style>
<div class="card-inside">
  <div class="inside-content">
    <p>Who is Mom's favorite child?</p>

    <select id="answer">
      <option selected value="steve">Steve</option>
      <option value="nick">Nick</option>
      <option value="joe">Joe</option>
    </select>

    <div class="answer-status"></div>
    
    <div class="controls">
      <button class="answer">Answer</button>
      <button class="reset">Reset</button>
    </div>
  </div>

  <script type="module">
    const root = document.querySelector(".plugin-content").shadowRoot;
    const answerStatus = root.querySelector(".answer-status");
    root.querySelector(".answer").addEventListener("click", async () => {
      const answer = root.querySelector("#answer").value;
      const qid = 1;
      const action = "answer";
      const resp = await fetch("", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ action, qid, answer }),
      });

      const output = await resp.json();
      if (output.error) {
        answerStatus.innerHTML = output.error;
      } else {
        answerStatus.innerHTML = output.message;
      }
    });

    root.querySelector(".reset").addEventListener("click", async () => {
      const action = "reset";
      const resp = await fetch("", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ action }),
      });

      const output = await resp.json();
      if (output.reset === "success") {
        answerStatus.innerHTML = "";
      }
    })
  </script>
</div>
  `;

  Host.outputString(html);
  return 0;
}

export function handle_post_request() {
  const input = JSON.parse(Host.inputString());

  if (input.action === "reset") {
    Host.outputString(JSON.stringify({ reset: "success" }));
    return 0;
  }

  if (input.action === "answer") {
    if (input.answer !== "steve") {
      Host.outputString(
        JSON.stringify({ error: "❌ Wrong answer, try again!" }),
      );
    } else {
      Host.outputString(
        JSON.stringify({ message: "✅ Correct! You know it!" }),
      );
    }

    return 0;
  }

  Host.outputString(JSON.stringify({ error: "Invalid action" }));

  return 0;
}
