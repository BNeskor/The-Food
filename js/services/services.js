const postData = async(url, data) =>{
   const res = await fetch(url,{
      method: "POST",
      headers: {
         'Content-Type':"application/json"
      },
      body: JSON.stringify(data)
   });
   return await res.json();
};

const getResourses = async(url) =>{
   const res = await fetch(url);
   if(!res.ok){
      throw new Error(`could not fetch ${url}, status: ${res.status}`);
   }
   return await res.json();
};

export {postData};
export {getResourses};