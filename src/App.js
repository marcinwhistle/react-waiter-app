import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Container>
      <Header>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/tables/:id' element={<Table />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Header>
    </Container>
  );
}

export default App;
