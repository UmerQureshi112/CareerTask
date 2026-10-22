const supaBaseURL = 'https://huyseufnvazmaeadhsaz.supabase.co';
const supaBaseApiKey = 'sb_publishable_ufzeOCNag7yliATf-ORpsg_Ee930BKr'; 

const supabaseClient = supabase.createClient(supaBaseURL, supaBaseApiKey);

let profileImg = document.querySelector(".profile img");
let profileAdd = document.querySelector(".profile-add");
let circle = document.querySelector(".circle");
let addFile = document.querySelector(".add-file");
let del = document.querySelector(".delete");

profileAdd.addEventListener("click", () => { addFile.click(); });

addFile.addEventListener("change", (event) => {
  let img = event.target.files[0];
  if (img) {
    circle.classList.add("circle");
    circle.style.border = "none";
    profileImg.src = URL.createObjectURL(img);
    
    del.addEventListener("click", () => {
      circle.style.border = "1px solid gray";
      profileImg.src = `assets/SVG/profle.svg`;
    });
  }
});

// ********** input value for left hand side *********** //
let list = document.querySelector(".list");
let button = document.querySelector(".button button");
let ul = document.querySelector("ul");
let inp = document.querySelectorAll(".inp");
let blankElert = document.querySelector(".blankElert");
let add = document.querySelectorAll(".add");
let form = document.querySelector("form");

// FIX: Do NOT call calulation() here! Prevents duplicate event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  blankElert.style.display = "none";
});

// FIX: Attach Clear All button listener ONCE outside the loop
button.addEventListener("click", () => {
  let deleteAlert = document.querySelector(".deleteAlert");
  deleteAlert.style.display = "flex";
  setTimeout(() => { deleteAlert.style.display = "none"; }, 1500);

  // Clear UI
  let allLis = ul.querySelectorAll("li");
  let allDates = ul.querySelectorAll(".date");
  allLis.forEach(el => el.remove());
  allDates.forEach(el => el.remove());
  
  button.style.display = "none";
  
  // Clear Storage
  for(let i=0; i<inp.length; i++) localStorage.removeItem(`key${i}`);
});

function calulation() {
  inp.forEach((val, index) => {
    add[index].addEventListener("click", async () => {
      let inPutValue = val.value;

      if (inPutValue.trim() === "") {
        blankElert.style.display = "flex";
        setTimeout(() => { blankElert.style.display = "none"; }, 1500);
        return;
      }

      let date = document.createElement("div");
      date.textContent = new Date().toLocaleDateString();
      date.classList.add("date");
      
      localStorage.setItem(`key${index}`, inPutValue);
   
      // FIX: Handle Supabase Errors (RLS)
      const response = await supabaseClient.from("CareerTask").insert({task: inPutValue});
      
      if (response.error) {
          console.error("Supabase Error:", response.error);
          alert("Failed to save task. Check Row Level Security (RLS) policies in Supabase!");
          return;
      }
      console.log("Supabase Success:", response.data);

      let li = document.createElement("li");
      li.innerHTML = `<span class="copy"> ${inPutValue}</span>
         <div class="svg">
            <div class="icon copied">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-slash-icon lucide-copy-slash"><line x1="12" x2="18" y1="18" y2="12"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </div>
            <div class="icon deleted">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
               </svg>
            </div>
         </div>`;

      ul.appendChild(date);
      ul.appendChild(li);
      list.appendChild(ul);

      val.value = "";
      button.style.display = "flex";

      // Copy to clipboard
      let Clip = li.querySelector(".copied");
      let CopyClipbord = document.querySelector(".CopyClipbord");
      let copy = li.querySelector(".copy");

      Clip.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(copy.textContent);
          CopyClipbord.style.display = "flex";
          setTimeout(() => { CopyClipbord.style.display = "none"; }, 1500);
        } catch (err) {
          console.log("Clipboard Error:", err);
          const textarea = document.createElement("textarea");
          textarea.value = copy.textContent;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          CopyClipbord.style.display = "flex";
          setTimeout(() => { CopyClipbord.style.display = "none"; }, 1500);
        }
      });

      // Single item delete
      let delItem = li.querySelector(".deleted");
      let deleteAlert = document.querySelector(".deleteAlert");
      delItem.addEventListener("click", () => {
        li.remove();
        date.remove();
        deleteAlert.style.display = "flex";
        if (ul.children.length === 0) button.style.display = "none";
        setTimeout(() => { deleteAlert.style.display = "none"; }, 1500);
      });
    });
  });
}

// Call calulation ONLY ONCE on page load to attach listeners
calulation();
    
// ********** Restore Items from LocalStorage on Refresh *********** //
for (let i = 0; i < inp.length; i++) {
    let getItem = localStorage.getItem(`key${i}`); // FIX: Match saved key format
    if (getItem) {
        let date = document.createElement("div");
        date.textContent = new Date().toLocaleDateString();
        date.classList.add("date");

        let li = document.createElement("li");
        li.innerHTML = `<span class="copy"> ${getItem}</span>
         <div class="svg">
            <div class="icon copied">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-slash-icon lucide-copy-slash"><line x1="12" x2="18" y1="18" y2="12"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </div>
            <div class="icon deleted">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
               </svg>
            </div>
         </div>`;

        ul.appendChild(date);
        ul.appendChild(li);
        list.appendChild(ul);
        button.style.display = "flex";

        // Re-attach listeners to loaded items
        let Clip = li.querySelector(".copied");
        let CopyClipbord = document.querySelector(".CopyClipbord");
        let copy = li.querySelector(".copy");
        let delItem = li.querySelector(".deleted");
        let deleteAlert = document.querySelector(".deleteAlert");

        Clip.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(copy.textContent);
                CopyClipbord.style.display = "flex";
                setTimeout(() => { CopyClipbord.style.display = "none"; }, 1500);
            } catch (err) {
                const textarea = document.createElement("textarea");
                textarea.value = copy.textContent;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                CopyClipbord.style.display = "flex";
                setTimeout(() => { CopyClipbord.style.display = "none"; }, 1500);
            }
        });

        delItem.addEventListener("click", () => {
            li.remove();
            date.remove();
            deleteAlert.style.display = "flex";
            if (ul.children.length === 0) button.style.display = "none";
            setTimeout(() => { deleteAlert.style.display = "none"; }, 1500);
        });
    }
                                }
