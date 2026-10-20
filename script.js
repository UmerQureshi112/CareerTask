const supaBaseURL = 'https://huyseufnvazmaeadhsaz.supabase.co';
const supaBaseApiKey = 'sb_publishable_ufzeOCNag7yliATf-ORpsg_Ee930BKr'; 

const supabaseClient = supabase.createClient(
  supaBaseURL,supaBaseApiKey
);

let profileImg = document.querySelector(".profile img");
let profileAdd = document.querySelector(".profile-add");
let circle = document.querySelector(".circle");
let addFile = document.querySelector(".add-file");
let del = document.querySelector(".delete");

profileAdd.addEventListener("click", () => {
  addFile.click();
});

addFile.addEventListener("change", (event) => {
  let img = event.target.files[0];

  if (img) {
    circle.classList.add("circle");
    circle.style.border = "none";
    profileImg.src = URL.createObjectURL(img);
    
      del.addEventListener("click", () => {
      circle.classList.add("circle");
      circle.style.border = "1px solid gray";
      profileImg.src = `assets/SVG/profle.svg`;
      
    });
  };
});

// ********** input value for left hand side *********** //
let list = document.querySelector(".list");
let button = document.querySelector(".button button");
let ul = document.querySelector("ul");
let inp = document.querySelectorAll(".inp");
let blankElert = document.querySelector(".blankElert");
let add = document.querySelectorAll(".add");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  blankElert.style.display = "none";
  calulation();
});

function calulation() {
  inp.forEach((val, index) => {
    add[index].addEventListener("click", async () => {
      let inPutValue = val.value;

      if (inp[index].value.trim() === "") {
       let blankElert = document.querySelector(".blankElert");
        blankElert.style.display = "flex";

        setTimeout(() => {
          blankElert.style.display = "none";
        }, 1500);

        return;
      }


      let date = document.createElement("div");
      date.textContent = new Date().toLocaleDateString();
      date.classList.add("date");
      localStorage.setItem(`key${index}`, inp[index].value);
   
       const response =  await supabaseClient.from("CareerTask").insert({task: inPutValue});
      console.log(response);

      let li = document.createElement("li");
      li.innerHTML = `<span class="copy"> ${inPutValue}</span>
         <div class="svg">
        <div class="icon copied">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-slash-icon lucide-copy-slash"><line x1="12" x2="18" y1="18" y2="12"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        </div>
        
        <div class="icon deleted">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"   stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        </div>
        </div>`;

      // ********** adjust to unorderlist *************
      // console.log(val.value)
      ul.appendChild(date);
      ul.appendChild(li);
      list.appendChild(ul);



      val.value = "";
      button.style.display = "flex";
      button.addEventListener("click", () => {
        let deleteAlert = document.querySelector(".deleteAlert");
        deleteAlert.style.display = "flex";

        setTimeout(() => {
          deleteAlert.style.display = "none";
        }, 1500);
        li.remove();
        date.remove();
        button.style.display = "none";
      })

      // ********** Copy to clipbord *************
      let Clip = li.querySelector(".copied");
      let CopyClipbord = document.querySelector(".CopyClipbord");
      let copy = li.querySelector(".copy");

      Clip.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(copy.textContent);
          CopyClipbord.style.display = "flex";

          setTimeout(() => {
            CopyClipbord.style.display = "none";
          }, 1500);

        } catch (err) {
          console.log("Clipboard Error:", err);

          // Fallback

          const textarea = document.createElement("textarea");
          textarea.value = copy.textContent;
          document.body.appendChild(textarea);
          CopyClipbord.style.display = "flex";

          setTimeout(() => {
            CopyClipbord.style.display = "none";
          }, 1500);

          textarea.select();
          textarea.setSelectionRange(0, 99999);

          document.execCommand("copy");
          document.body.removeChild(textarea);
        };
      });

      // ********** list item delete *************
      let del = li.querySelector(".deleted");
      let deleteAlert = document.querySelector(".deleteAlert");
      del.addEventListener("click", () => {
        li.remove();
        date.remove()
        deleteAlert.style.display = "flex";
        if (ul.children.length === 0) {
          button.style.display = "none";
        };

        setTimeout(() => {
          deleteAlert.style.display = "none";
        }, 1500);

      });
    });
  });
};
calulation();
    
       let date = document.createElement("div");
      date.textContent = new Date().toLocaleDateString();
      date.classList.add("date");

      let getItem = localStorage.getItem("key");
      if (getItem) {
            let li = document.createElement("li");
       li.innerHTML = `<span class="copy"> ${getItem}</span>
         <div class="svg">
        <div class="icon copied">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-slash-icon lucide-copy-slash"><line x1="12" x2="18" y1="18" y2="12"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        </div>
        
        <div class="icon deleted">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"   stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        </div>
        </div>`;

      ul.appendChild(date);
      ul.appendChild(li);
      list.appendChild(ul);

        button.style.display = "flex";
      button.addEventListener("click", () => {
        let deleteAlert = document.querySelector(".deleteAlert");
        deleteAlert.style.display = "flex";

        setTimeout(() => {
          deleteAlert.style.display = "none";
        }, 1500);
        li.remove();
        date.remove();
        button.style.display = "none";
      });

            // ********** Copy to clipbord *************
      let Clip = li.querySelector(".copied");
      let CopyClipbord = document.querySelector(".CopyClipbord");
      let copy = li.querySelector(".copy");

      Clip.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(copy.textContent);
          CopyClipbord.style.display = "flex";

          setTimeout(() => {
            CopyClipbord.style.display = "none";
          }, 1500);

        } catch (err) {
          console.log("Clipboard Error:", err);

          // Fallback

          const textarea = document.createElement("textarea");
          textarea.value = copy.textContent;
          document.body.appendChild(textarea);
          CopyClipbord.style.display = "flex";

          setTimeout(() => {
            CopyClipbord.style.display = "none";
          }, 1500);

          textarea.select();
          textarea.setSelectionRange(0, 99999);

          document.execCommand("copy");
          document.body.removeChild(textarea);
        };
      });

       // ********** list item delete *************
      let delet = li.querySelector(".deleted");
      let deleteAlert = document.querySelector(".deleteAlert");
      delet.addEventListener("click", () => {

        li.remove();
        date.remove()
        deleteAlert.style.display = "flex";
        if (ul.children.length === 0) {
          button.style.display = "none";
        };

        setTimeout(() => {
          deleteAlert.style.display = "none";
        }, 1500);

      });
      }

// ********** right hand working to img *********** //

let RightHandSide = document.querySelector(".Right-hand-side");
let resume = document.querySelector("#resume");
let resumeFile = document.querySelector(".resume-file");

resume.addEventListener("click", () => {
  resumeFile.click();
});

resumeFile.addEventListener("change", (run) => {
  let fixed = run.target.files[0];
  if (!fixed) return;

  let rightBox = document.querySelector(".right-side-box");
  let imgBox = document.createElement("div");
  let del = document.createElement("div");
  let imgg = document.createElement("div");

  imgBox.classList.add("img-box");
  del.classList.add("del");
  imgg.classList.add("imgg");

  del.innerHTML = `<div class ="item"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /> </div>
        </svg>
        <div class="pencil"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-line-icon lucide-pen-line"><path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg> </div>`;

  imgBox.appendChild(imgg);
  imgBox.appendChild(del);
  rightBox.appendChild(imgBox);

  if (fixed.type.startsWith("image/")) {
    let img = document.createElement("img");
    imgg.appendChild(img);
    img.src = URL.createObjectURL(fixed);
  } else {
    imgg.classList.add("file-preview");
    imgg.innerHTML = `
      <div class="file-card">
        <div class="file-icon">📄</div>
        <div class="file-details">
          <span class="file-name">${fixed.name}</span>
          <span class="file-type">${fixed.type || "Resume File"}</span>
        </div>
      </div>`;
  }

  let item = del.querySelector(".item svg");
  let delItem = document.querySelector(".deleteAlert");
  let pencil = del.querySelector(".pencil svg");

  item.addEventListener("click", () => {
    imgBox.remove();
    delItem.style.display = "flex";
    setTimeout(() => {
      delItem.style.display = "none";
    }, 1500);
  });

  pencil.addEventListener("click", () => {
    resumeFile.value = "";
    resumeFile.click();
  });
});

// working to an outher mobail 
let speace = document.querySelector(".speace");
let hameBurger = document.querySelector(".hame-burger svg");

hameBurger.addEventListener("click", () => {
  let LRB = document.createElement("div");
  LRB.classList.add("LRB");

  let divBox = document.createElement("div");
  divBox.classList.add("divBox");

  let cancelP = document.createElement("div");
  cancelP.classList.add("cancelP");

  let cancel = document.createElement("div");
  cancel.innerHTML = `<div class="cancel"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg></div>`;
  cancel.classList.add("cancel");

  let BOne = document.createElement("button");
  BOne.innerHTML = ` <div class="items">Open to list item </div>`;
  BOne.classList.add("BOne")

  let BTwo = document.createElement("button");
  BTwo.innerHTML = ` <div class="resume-files">Open to resume files</div>`;
  BTwo.classList.add("BTwo");


  divBox.appendChild(cancelP);
  cancelP.appendChild(cancel);

  divBox.appendChild(BOne);
  divBox.appendChild(BTwo);
  LRB.appendChild(divBox);
  speace.appendChild(LRB);

  let cancelBack = cancel.querySelector(".cancel svg");
  cancelBack.addEventListener("click", () => {
    LRB.remove();

  });

  setTimeout(() => {
    LRB.remove();
  }, 3000);

  let leftHandSide = document.querySelector(".left-hand-side");
  let leftCancle = document.querySelector(".left-hand-side .cancle-svg");

  let rightHandSide = document.querySelector(".Right-hand-side");
  let rightCancle = document.querySelector(".Right-hand-side .cancle-svg");

  let divitems = BOne.querySelector(".items");
  let divfiles = BTwo.querySelector(".resume-files");

  divitems.addEventListener("click", () => {
    leftHandSide.classList.add("show-left-side");
    rightHandSide.classList.remove("show-right-hand-side-item");

    leftCancle.addEventListener("click", () => {
      leftHandSide.classList.remove("show-left-side");
    });
  });

  divfiles.addEventListener("click", () => {
    rightHandSide.classList.add("show-right-hand-side-item");
    leftHandSide.classList.remove("show-left-side");

    rightCancle.addEventListener("click", () => {
      rightHandSide.classList.remove("show-right-hand-side-item");
    });
  });

});