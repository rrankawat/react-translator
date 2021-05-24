import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [langs, setLangs] = useState({});

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const getLangs = async () => {
    const res = await axios.get(
      `https://api.cognitive.microsofttranslator.com/languages?api-version=3.0`
    );

    setLangs(res.data.translation);
  };

  useEffect(() => {
    getLangs();
  }, []);

  const getOptions = () => {
    let options = [];

    for (let key in langs) {
      options.push(
        <option key={key} value={key}>
          {langs[key].name}
        </option>
      );
    }

    return options;
  };

  const translate = async () => {
    const endpoint = `https://api.cognitive.microsofttranslator.com/`;
    const subscriptionKey = `bbce00cf9d3c44d88c0bbea72a017304`;
    const location = `centralindia`;

    const res = await axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        // 'X-ClientTraceId': uuidv4().toString(),
      },
      params: {
        'api-version': '3.0',
        from: from,
        to: to,
      },
      data: [
        {
          text: input,
        },
      ],
      responseType: 'json',
    });

    setOutput(res.data[0].translations[0].text);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-6">
          <select
            className="form-select"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {getOptions()}
          </select>
        </div>
        <div className="col-6">
          <select
            className="form-select"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {getOptions()}
          </select>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-6">
          <textarea
            className="form-control"
            rows="6"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="col-6">
          <textarea
            className="form-control"
            rows="6"
            value={output}
            disabled
          ></textarea>
        </div>
      </div>

      <button className="btn btn-primary mt-4" onClick={translate}>
        Translate
      </button>
    </div>
  );
};

export default App;
