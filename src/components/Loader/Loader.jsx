import { Bars } from 'react-loader-spinner'
export const Loader = () => {
    return (
        <Bars
            height="80"
            width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{ margin: '0 auto' }}
          wrapperClass=""
            visible={true}
        />)
}