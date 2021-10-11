import {
  Card,
  DescriptionList,
  Layout,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer
} from "@shopify/polaris";

function skeletonView() {
  return (
    <Card sectioned title="Loading...">
      <Card.Section>
        <Layout.Section>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={2} />
          </TextContainer>
        </Layout.Section>
        <Layout.Section>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText lines={2} />
          </TextContainer>
        </Layout.Section>
      </Card.Section>
    </Card>
  );
}

export default function NFTView({ name, data, attributes, loading }) {
  const visible = () => data.length !== 0;

  if (loading) {
    return skeletonView();
  } else if (visible()) {
    return (
      <Card title={name}>
        <Card.Section>
          <DescriptionList items={data} />
        </Card.Section>

        <Card.Section subdued title="Attributes">
          <DescriptionList items={attributes} />
        </Card.Section>
      </Card>
    );
  } else {
    return null;
  }
}
