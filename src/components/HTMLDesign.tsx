export default function DesignCanvass({ htmlStringFromApi }: {htmlStringFromApi: string}) {
  
  return (
    <iframe
      title="API Content"
      srcDoc={htmlStringFromApi}
      style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
      sandbox="allow-scripts allow-same-origin" 
    />
  );
}