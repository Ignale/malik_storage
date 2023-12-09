import { Skeleton } from 'primereact/skeleton';
import React from 'react'

type Props = {}
    const Sceleton = () => {
        return (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="mb-3 mt-3">
                <Skeleton shape="rectangle" width="100%" height="80px" />
              </div>
            ))}
          </>
        )
      }


export default Sceleton