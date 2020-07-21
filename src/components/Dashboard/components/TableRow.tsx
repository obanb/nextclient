

export default ({ title, description, loading }) => (
    <div className="table table-row">
      <p className={loading ? 'loading' : ''}>
        {title} 
      </p>{' '}
      <p className={loading ? 'loading' : ''}>
        {description} 
      </p>{' '}
    </div>
  )