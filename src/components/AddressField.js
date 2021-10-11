import { TextField } from "@shopify/polaris";

export default function AddressField({ address, handleAddressChange, error }) {
  return (
    <TextField
      id="address-field"
      value={address}
      onChange={handleAddressChange}
      error={error}
    />
  );
}
