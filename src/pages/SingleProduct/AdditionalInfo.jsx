import { Container } from "../../components/Container";
import { decode } from "html-entities";

const styles = {
  sectionTitle: "text-2xl mb-12 pb-3 font-bold border-b",
  listItem: "mb-7",
};

function InfoBlock({ title, list }) {
  return (
    <div className="flex gap-x-8 justify-between mb-10">
      <h3 className="text-xl font-medium">{title}</h3>
      <ul className="max-w-4xl text-sm leading-tight grow">{list}</ul>
    </div>
  );
}

export function AdditionalInfo({ features, included, details }) {
  const formatFeatures = (f, index) => {
    const features = f.feature.split("\n");

    const content =
      features.length > 1 ? (
        <>
          <h3 className="font-bold mb-1">{decode(features[0])}</h3>
          {decode(features[1])}
        </>
      ) : (
        decode(features[0])
      );
    return (
      <li key={index} className={styles.listItem}>
        {content}
      </li>
    );
  };

  return (
    <Container as="section">
      <h2 className={styles.sectionTitle}>Overview</h2>

      {features && features.length > 0 && (
        <InfoBlock title="Features" list={features.map(formatFeatures)} />
      )}

      {included && included.length > 0 && (
        <InfoBlock
          title="What's included?"
          list={included.map((i, index) => {
            return (
              <li key={index} className={styles.listItem}>
                {decode(i.includedItem)}
              </li>
            );
          })}
        />
      )}

      {details && details.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Specifications</h2>
          <InfoBlock
            title="Details"
            list={details.map((d, index) => {
              return (
                <li key={index} className={styles.listItem}>
                  <div className="flex">
                    <span className="font-semibold inline-block w-1/2">{d.name}</span>
                    <span className="w-1/2">{d.values.map((detail) => detail)}</span>
                  </div>
                </li>
              );
            })}
          />
        </>
      )}
    </Container>
  );
}
