var roomSelect = document.getElementById("objektPomiarowy");
fetch("https://tempapi.ct8.pl/getrooms")
  .then((res) => res.json())
  .then((res) => {
    res.forEach(addToSelect);
    getData();
  });
function getData() {
  var sel = document.getElementById("objektPomiarowy");
  var obiekt = sel.options[sel.selectedIndex].text;
  console.log(`obiekt=${obiekt}`);
  // fetch("gettemp", {
  //   method: "post",
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  //   body: JSON.stringify(obiekt),
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log(res);
  //   });
  (async () => {
    const rawResponse = await fetch("https://tempapi.ct8.pl/gettemp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ obiekt: obiekt, b: "Textual content" }),
    });
    const content = await rawResponse.json();

    console.log(content);
  })();
}

function addToSelect(item) {
  var myOption = document.createElement("option");
  myOption.text = item.my_pomieszczenie;
  myOption.value = item.my_nr_dec;
  roomSelect.add(myOption);
}
