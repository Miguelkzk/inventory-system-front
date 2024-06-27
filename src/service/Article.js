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
    const body = {
      periods_quantity: parseInt(formData.demand_period_count),
      period: formData.type_of_period,
      prediction_methods: methods,
      weightings: weightings,
      predicted_demand_for_the_previous_period: parseInt(pmseParams.predicted_demand_for_the_previous_period),
      alpha: parseFloat(pmseParams.alpha)
    }
    // que me perdonde dios
    const demand_prediction = {demand_prediction: body}
    console.log(demand_prediction)
    const response = await fetch(`${BASE_URL}/articles/${id}/predict_demand`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(demand_prediction)
      }
    );
    const data = await response.json();
    console.log(data)
    return data;
  },
  getArticleByCode: async(code) =>{
    const response = await fetch(`${BASE_URL}/articles/find_by_code?code=${code}`);
    const data = await response.json();
    return data;
    
  },
  getHistoricalDemand:async(article, filters) =>{
      var response = '';
    if (filters.demand_period_count == ''){
       response = await fetch(`${BASE_URL}/articles/${article.id}/historical_demand`)
    }else{
      response = await fetch(`${BASE_URL}/articles/${article.id}/historical_demand?periods_quantity=${filters.demand_period_count}&period=${filters.demand_period_kind}`);
    }
    const data = await response.json();
    console.log(data)
    return data;
}
}
