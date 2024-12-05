const JobCard = ({customer, date}) => {
    return ( 
        <div
      style={{
        border: '1px solid #e0e0e0',
        padding: '15px',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <h3 style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#333' }}>{}</h3>
        <p style={{ fontSize: '1em', color: '#666' }}>
          <strong>Customer:</strong> {customer}
        </p>
        <p style={{ fontSize: '1em', color: '#666' }}>
          <strong>Date:</strong> {date}
        </p>
        <p
          style={{
            fontSize: '1em',
            fontWeight: 'bold',
            color: status === 'Completed' ? 'green' : 'orange',
          }}
        >
          {/* <strong>Status:</strong> {status} */}
        </p>
      </div>

      <div
        style={{
          marginRight: '10px', // Move the button slightly to the left
        }}
      >
        
      </div>

    </div>
    );
}
 
export default JobCard;