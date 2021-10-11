import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  Page,
  Card,
  Button,
  Form,
  FormLayout,
  Spinner,
  Stack
} from "@shopify/polaris";
import { useState, useEffect } from "react";

import "./styles.css";
import NFT from "./lib/nft.js";
import { fromObject, fromNFTAttributes } from "./lib/formatting.js";
import AddressField from "./components/AddressField.js";
import NFTView from "./components/NFTView.js";

const nfts = {
  cyberkongs: "0x57a204aa1042f6e66dd7730813f4024114d74f37",
  coolcats: "0x1a92f7381b9f03921564a437210bb9396471050c",
  metahero: "0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2"
};

const exampleAddress = "0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2";

export default function App() {
  const [error, setError] = useState("");
  const [address, setAddress] = useState(exampleAddress);
  const [nftName, setNFTName] = useState("");
  const [result, setResult] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      new NFT(address);
      setError("");
    } catch {
      setError("Invalid address format");
    }
  }, [address]);

  const lookupNFT = async () => {
    console.log(`Looking up ${address}`);
    try {
      setLoading(true);
      const nft = new NFT(address);
      await nft.load();

      setNFTName(nft.name);
      setResult(fromObject(nft.data));
      setAttributes(fromNFTAttributes(nft.attributes));
      setError("");
    } catch (error) {
      console.log(error);
      setError("Invalid address format");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  return (
    <div className="App">
      <AppProvider i18n={enTranslations}>
        <Page title="NFT Explorer">
          <Card sectioned>
            <Form onSubmit={lookupNFT}>
              <FormLayout>
                <AddressField
                  address={address}
                  handleAddressChange={handleAddressChange}
                  error={error}
                />
                <Stack>
                  <Button onClick={lookupNFT}>Find</Button>
                  {loading && <Spinner size="small" />}
                </Stack>
              </FormLayout>
            </Form>
          </Card>
          <NFTView
            name={nftName}
            data={result}
            attributes={attributes}
            loading={loading}
          />
        </Page>
      </AppProvider>
    </div>
  );
}
