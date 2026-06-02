import { useState} from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function LandingPageForm() {
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    favoriteColor: '',
    observations: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     if (!form.name || !form.cpf || !form.email || !form.favoriteColor) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if(form.cpf.length !== 14) {
      setError('CPF deve conter 11 dígitos.');
      return;
    }

  try {
    const payload = {
      ...form,
      cpf: form.cpf.replace(/\D/g, ''),
    };

    const response = await api.post('/customers', payload);
    console.log(response.data);
    Swal.fire('Sucesso', 'Formulário enviado com sucesso!', 'success');
    setForm({
      name: '',
      cpf: '',
      email: '',
      favoriteColor: '',
      observations: '',
    });
    setError('');
  } catch (error) {

  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    Swal.fire(
      'Erro',
      Array.isArray(message)
        ? message.join('\n')
        : message || error.message,
      'error'
    );
  }

}
    console.log(form);
  };

  const formatCpf = (value : string) => {
    value = value.replace(/\D/g, '').slice(0, 11);

    return value
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      cpf: formatCpf(e.target.value),
    });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <br />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>CPF</label>
        <br />
        <input
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleCpfChange}
          placeholder="000.000.000-00"
        />
      </div>

      <div>
        <label>E-mail</label>
        <br />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Cor</label>
        <br />
        <select
          name="favoriteColor"
          value={form.favoriteColor}
          onChange={handleChange}
        >
          <option value="">Selecione uma cor</option>
          <option value="vermelho">Vermelho</option>
          <option value="laranja">Laranja</option>
          <option value="amarelo">Amarelo</option>
          <option value="verde">Verde</option>
          <option value="azul">Azul</option>
          <option value="anil">Anil</option>
          <option value="violeta">Violeta</option>
        </select>
      </div>

      <div>
        <label>Observações</label>
        <br />
        <textarea
          name="observations"
          rows={4}
          value={form.observations}
          onChange={handleChange}
        />
      </div>
      <span style={{ color: 'red', marginBottom: '16px' }}>{error}</span>
      
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}