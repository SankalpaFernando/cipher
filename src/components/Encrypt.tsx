import { Button, Container, Radio, RadioGroup, Table, Textarea, TextInput } from "@mantine/core"
import { ChangeEvent, useState } from "react";
import "../styles/index.scss";

export const Encrypt: React.FC = () => {
  const [shift, setShift] = useState("5");
  const [plainText, setPlainText] = useState<string[]>("Silence is not empty its full of your answers".toUpperCase().split(""));
  const [guesses, setGusses] = useState<string[]>([]);
  const [cipherText, setCipherText] = useState("");
  const [encryptDict, setEncryptDict] = useState<"alpha"|"alphanum"|"latin">("alpha");
  const [decryptDict, setDecryptDict] = useState<
    'alpha' | 'alphanum' | 'latin'
  >('alpha');

  const ALPHA = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"," "];
  const NUM = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const encrypt = () => {
    let dict:(string|number)[] = ALPHA;
    switch (encryptDict) {
      case "alphanum":
        dict = [...ALPHA, ...NUM];
        break;
      case "latin":
        dict = dict.filter(char => !(char == "J" || char == "U" || char == "W"));
        break;
    }
    const cipher = [];
    for (let char of plainText) {
      let index = dict.indexOf(char) + parseInt(shift);
      while (index > dict.length) {
        index -= dict.length;
      } 
      cipher.push(dict[index-1]);
    }
    setCipherText(cipher.join(""));
  }

  const decrypt = () => {
    let dict: (string | number)[] = ALPHA;
    switch (decryptDict) {
      case 'alphanum':
        dict = [...ALPHA, ...NUM];
        break;
      case 'latin':
        dict = dict.filter(
          (char) => !(char == 'J' || char == 'U' || char == 'W')
        );
        break;
    }
    const guess = [];
    console.log(dict.length)
    const cipher = cipherText.split("")
    for (let i = 0; i <= dict.length; i++){
      const plain = [];
      for (let char of cipher) {
        let index = dict.indexOf(char) - i;
        while (index < 0) {
          index += dict.length;
        }
        plain.push(dict[index]);
      }
      guess.push(plain.join(""));
    }
    setGusses(guess);
    
  }


  return (
    <div className="container">
      <div className="sub-content">
        <Textarea
          minRows={10}
          label="Plaintext"
          value={plainText.join('')}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setPlainText(e.target.value.toUpperCase().split(''))
          }
        />
        <div className="options">
          <RadioGroup
            onChange={(value: 'alpha' | 'alphanum' | 'latin') =>
              setEncryptDict(value)
            }
            value={encryptDict}
            orientation="vertical"
          >
            <Radio value="alpha" label="English Alphabet Only" />
            <Radio value="alphanum" label="English Alphabet and 0-9" />
            <Radio value="latin" label="Latin Alphabet (Missing J,U,W)" />
          </RadioGroup>
          <TextInput
            placeholder="Shift"
            style={{ marginTop: '2rem' }}
            type="number"
            value={shift}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setShift(e.target.value)
            }
          />

          <div className="btn-group">
            <Button onClick={encrypt} style={{ width: '100%' }}>
              Encrypt
            </Button>
          </div>
        </div>
      </div>

      <div className="sub-content">
        <Textarea
          value={cipherText}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setCipherText(e.target.value.toUpperCase())
          }
          label="Ciphertext"
          minRows={10}
        />
        <div className="options">
          <RadioGroup
            onChange={(value: 'alpha' | 'alphanum' | 'latin') =>
              setDecryptDict(value)
            }
            value={decryptDict}
            orientation="vertical"
          >
            <Radio value="alpha" label="English Alphabet Only" />
            <Radio value="alphanum" label="English Alphabet and 0-9" />
            <Radio value="latin" label="Latin Alphabet (Missing J,U,W)" />
          </RadioGroup>

          <div className="btn-group" style={{ marginTop: '3rem' }}>
            <Button onClick={decrypt} style={{ width: '100%' }}>
              Decrypt
            </Button>
          </div>
        </div>
        <div>
          <h2
            style={{ textAlign: 'center', color: '#666', margin: '3rem auto' }}
          >
            Brute Force Results
          </h2>
          <div className="charMap">
            <Table striped>
              <thead>
                <tr>
                  <th>Shift Key</th>
                  <th>Plain Text</th>
                </tr>
              </thead>
              <tbody>
                {guesses.map((text, index) => (
                  <tr className="table-row">
                    <td>{index + 1}</td>
                    <td>{text}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );  
}