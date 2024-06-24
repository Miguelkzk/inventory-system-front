const BASE_URL = 'http://127.0.0.1:3000'
export const ArticleService = {
  getArticles: async () => {
    const response = await fetch(`${BASE_URL}/articles/`);
    const data = await response.json();
    return data;
  },
  getAttributes: async ()=>{
    const response = await fetch(`${BASE_URL}/articles/attributes_description`);
    const data = await response.json();
  return data
  },
  newArticle: async (article) => {
    const response = await fetch(`${BASE_URL}/articles/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
      }
    );
    const data = await response.json();
    return data;
  },
  updateArticle: async (formData, article) => {
    console.log(article)
    const response = await fetch(`${BASE_URL}/articles/${article.id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    const data = await response.json();
    return data;
  },
  deleteArticle: async (article) => {
    const response = await fetch(`${BASE_URL}/articles/${article.id}`,
      {
        method: "DELETE"
      }
    );
    const data = await response.json();
    return data;
  },
  predictDemand: async (formData, methods,pmseParams,id,weightings) =>{
    debugger
    const body = {
      periods_quantity: formData.demand_period_count,
      period: formData.type_of_period,
      prediction_methods: methods,
      weightings: weightings,
      predicted_demand_for_the_previous_period: pmseParams.predicted_demand_for_the_previous_period,
      alpha: pmseParams.alpha
    }
    console.log(body)
  },
  getArticleByCode: async(code) =>{
    const response = await fetch(`${BASE_URL}/articles/find_by_code?code=${code}`);
    const data = await response.json();
    return data;
    
  }
}
