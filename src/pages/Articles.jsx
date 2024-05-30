import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import GenericModal from "../components/GenericModal";
import { ArticleService } from "../service/Article";
import { useNavigate } from "react-router-dom";
import ViewButton from "../components/ViewButton";

function ArticlesTable() {

  const fields = [
    { name: 'code', type: 'text', label: 'code' },
    { name: 'name', type: 'text', label: 'name' },
    { name: 'description', type: 'text', label: 'description' },
    { name: 'cost', type: 'text', label: 'cost' },
    { name: 'current_stock', type: 'text', label: 'Current Stock' },
    { name: 'estimated_demand', type: 'text', label: 'Estimated demand' },
    { name: 'inventory_model', type: 'text', label: 'Inventory model' },
    { name: 'requested_point', type: 'text', label: 'Requested point' },
    { name: 'security_stock', type: 'text', label: 'Security stock' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [articles, setArticles] = useState([]);
  const [initialValues, setInitialValues] = useState({});

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async (formData) => {
    console.log(formData)
    try {
      await ArticleService.newArticle(formData)
      fetchArticles()
      handleCloseModal()
    } catch (error) {
      console.error(error)
    }
  }

  const newArticle = () => {
    setTitleModal('New Article')
    setInitialValues({})
    setShowModal(true)

  }

  const fetchArticles = async () => {
    const articlesData = await ArticleService.getArticles()
    console.log(articlesData)
    setArticles(articlesData)
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const navigate = useNavigate();
  const viewDetail = (article) => {
    navigate('/article', { state: { article } });
  }

  return (
    <>
      <div className="container mt-3">
        <Button onClick={() => newArticle()}>New article</Button>

        <GenericModal
          show={showModal}
          handleClose={handleCloseModal}
          title={titleModal}
          fields={fields}
          handleFormSubmit={handleSave}
          initialValues={initialValues}
        />
        <Table hover style={{ fontSize: '18px', marginTop: '1rem' }}>
          <thead style={{ textAlign: 'center' }} >
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>View all</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center', cursor: 'pointer' }} >
            {articles.map(article => (
              <tr key={article.id}>
                <td>{article.code}</td>
                <td>{article.name}</td>
                <td>
                  <ViewButton onClick={() => viewDetail(article)}>view detail</ViewButton>
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>
          </tbody>
        </Table >
      </div>
    </>

  )
}
export default ArticlesTable;